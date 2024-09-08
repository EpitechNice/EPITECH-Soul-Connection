import axios, { all } from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

import { hashSync, genSaltSync } from "bcrypt";

import Clothes from "../models/clothesModel.js";
import Encounter from "../models/encounterModel.js";
import Event from "../models/eventModel.js";
import Payment from "../models/paymentModel.js";
import Tip from "../models/tipModel.js";
import User from "../models/userModel.js";

import { createDB, delay } from "../config/dbCreate.js";

import * as fs from "fs";

const UPLOAD_PATH = "/usr/src/app/images/";

async function retreiveData(session, url, requiredField) {
    let data;
    try {
        data = await session.get(url);
    } catch (err) {
    }
    while (data === undefined || data.data[requiredField] === undefined) {
        try {
            data = await session.get(url);
        } catch(err) {
            await delay(1000);
        }
    }
    return data;
}

async function addClothe(session, type, id) {
    let clothe = await Clothes.findByPk(id);
    if (clothe === undefined) {
        const imageResponse = await session.get(`/api/clothes/${id}/image`, {
            responseType: "arraybuffer"
        });
        fs.writeFileSync(UPLOAD_PATH + `clothes/${clothe.id}.png`, imageResponse.data);
        clothe = await Clothes.create({
            id: id,
            type: type,
            image_path: UPLOAD_PATH + `clothes/${clothe.id}.png`
        });
    }
    return clothe;
}

async function fetchDB() {
    await createDB();

    fs.mkdirSync(UPLOAD_PATH + "customers/", { recursive: true });
    fs.mkdirSync(UPLOAD_PATH + "employees/", { recursive: true });
    fs.mkdirSync(UPLOAD_PATH + "clothes/", { recursive: true });

    const cookieJar = new CookieJar();
    const session = wrapper(axios.create({
        baseURL: "https://soul-connection.fr",
        headers: {
            "X-Group-Authorization": process.env.REMOTE_API_KEY,    // Default headers, like a session
            "Content-Type": "application/json",
        },
        jar: cookieJar,
    }));

    console.log("\x1b[32m%s\x1b[0m", "[INFO] Starting script");

    console.log("\x1b[34m%s\x1b[0m", "[INFO] Logging in...");

    try {
        const login = await session.post("/api/employees/login", {
            "email": process.env.REMOTE_API_EMAIL,
            "password": process.env.REMOTE_API_PASSW,
        });
        session.defaults.headers["Authorization"] = "Bearer " + login.data.access_token;
        console.log("\x1b[34m%s\x1b[0m", `[INFO] Got an access token: ${login.data.access_token.slice(0, 9)}...`);
    } catch (err) {
        console.error("\x1b[31m%s\x1b[0m", `[ERROR] Could not login: ${err} !`);
        process.exit(1);
    }

    const me = await retreiveData(session, "/api/employees/me", "id");

    console.log("\x1b[32m%s\x1b[0m", `[INFO] Hello ${me.data.name} ${me.data.surname}`);

    try {
        let alltips = await retreiveData(session, "/api/tips", 0);

        for (var index in alltips.data)
            Tip.upsert(alltips.data[index]);
    } catch (err) {
        console.error("\x1b[31m%s\x1b[0m", `[ERROR] Could not retrieve tips: ${err}`);
    }

    let events = await retreiveData(session, "/api/events", 0).data;

    const allemployees = await retreiveData(session, "/api/employees", 0);

    await Promise.all(allemployees.data.map(async (employee, i) => {
        console.log("\x1b[32m%s\x1b[0m", `[INFO] Retreiving employee ${i + 1}/${allemployees.data.length}`);

        try {
            const response = await retreiveData(session, `/api/employees/${employee.id}`, "id");

            const imageResponse = await session.get(`/api/employees/${employee.id}/image`, {
                responseType: "arraybuffer"
            });
            fs.writeFileSync(UPLOAD_PATH + `employees/${employee.id}.png`, imageResponse.data);

            let newEmployee = await User.upsert({
                id: response.data.id,
                email: response.data.email,
                password: (response.data.email === process.env.REMOTE_API_EMAIL ? hashSync(process.env.REMOTE_API_PASSW, genSaltSync(10)) : null),
                type: "Coach",
                name: response.data.name,
                surname: response.data.surname,
                birth_date: Date(response.data.birth_date),
                gender: response.data.gender,
                image_path: UPLOAD_PATH + `employees/${response.data.id}.png`,
                work: response.data.work
            });

            for (var event in events) {
                if (events[event].employee_id !== employee.id)
                    continue;
                newEmployee.events.push(events[event]);
            }
        } catch (err) {
            console.error("\x1b[31m%s\x1b[0m", `[ERROR] Could not retrieve data or image for employee ${employee.id}: ${err}`);
        }
    }));

    const allcustomers = await retreiveData(session, "/api/customers", 0);

    await Promise.all(allcustomers.data.map(async (customer, i) => {
        console.log("\x1b[32m%s\x1b[0m", `[INFO] Retreiving customer ${i + 1}/${allcustomers.data.length}`);

        try {
            let clothes = await retreiveData(session, `/api/customers/${customer.id}/clothes`, 0).data;
            let payments = await retreiveData(session, `/api/customers/${customer.id}/payments_history`, 0).data;
            let encounters = await retreiveData(session, `/api/encounters/customer/${customer.id}`, 0).data;
            const response = await retreiveData(session, `/api/customers/${customer.id}`, "id");

            let clothes_array = [];

            for (let clothe in clothes)
                clothes_array.push(addClothe(session, clothes[clothe].type, clothes[clothe].id));

            let encounters_array = [];

            for (let encounter in encounters)
                encounters_array.push(await Encounter.upsert(encounters[encounter]));

            let payments_array = [];

            for (let payment in payments)
                payments_array.push(await Payment.upsert(payments[payment]));

            const user = await User.upsert({
                id: response.data.id,
                email: response.data.email,
                type: "Client",
                name: response.data.name,
                surname: response.data.surname,
                birth_date: Date(response.data.birth_date),
                gender: response.data.gender,
                image_path: UPLOAD_PATH + `customers/${response.data.id}.png`,
                astrological_sign: response.data.astrological_sign,
                description: response.data.description,
            });

            user.clothes = clothes_array;
            user.payments = payments_array;
            user.encounters = encounters_array;

            const imageResponse = await session.get(`/api/customers/${customer.id}/image`, {
                responseType: "arraybuffer"
            });
            fs.writeFileSync(UPLOAD_PATH + `customers/${customer.id}.png`, imageResponse.data);
        } catch (err) {
            console.error("\x1b[31m%s\x1b[0m", `[ERROR] Could not retrieve data or image for customer ${customer.id}: ${err}`);
        }
    }));
}

fetchDB();
