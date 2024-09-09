import axios, { all } from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

import { hashSync, genSaltSync } from "bcrypt";

import Clothing from "../models/clothingModel.js";
import Encounter from "../models/encounterModel.js";
import Event from "../models/eventModel.js";
import Payment from "../models/paymentModel.js";
import Tip from "../models/tipModel.js";
import Employee, { employeeType } from "../models/employeeModel.js"
import Customer from "../models/customerModel.js"

import { createDB, delay } from "../config/dbCreate.js";

import * as fs from "fs";

const UPLOAD_PATH = "/usr/src/app/images/";
const areWeManager = true;

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
    let clothe = await Clothing.findByPk(id);
    if (clothe !== undefined)
        return clothe;
    const imageResponse = await session.get(`/api/clothes/${id}/image`, {
        responseType: "arraybuffer"
    });
    fs.writeFileSync(UPLOAD_PATH + `clothes/${clothe.id}.png`, imageResponse.data);
    return await Clothing.create({
        id: id,
        type: type,
        image_path: UPLOAD_PATH + `clothes/${clothe.id}.png`
    });
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

    while (1) {
        try {
            const login = await session.post("/api/employees/login", {
                "email": process.env.REMOTE_API_EMAIL,
                "password": process.env.REMOTE_API_PASSW,
            });
            session.defaults.headers["Authorization"] = "Bearer " + login.data.access_token;
            console.log("\x1b[34m%s\x1b[0m", `[INFO] Got an access token: ${login.data.access_token.slice(0, 9)}...`);
            break;
        } catch (err) {
            console.error("\x1b[31m%s\x1b[0m", `[ERROR] Could not login: ${err} !`);
            console.error("\x1b[31m%s\x1b[0m", `        Retrying after 10 seconds...`);
            await delay(10000);
        }
    }

    const me = await retreiveData(session, "/api/employees/me", "id");

    console.log("\x1b[32m%s\x1b[0m", `[INFO] Hello ${me.data.name} ${me.data.surname}`);

    console.log("\x1b[92m%s\x1b[0m", "[INFO] === Retreiving tips ===");

    try {
        let alltips = await retreiveData(session, "/api/tips", 0);

        for (var index in alltips.data)
            Tip.upsert(alltips.data[index]);
    } catch (err) {
        console.error("\x1b[31m%s\x1b[0m", `[ERROR] Could not retrieve tips: ${err}`);
    }

    console.log("\x1b[92m%s\x1b[0m", "[INFO] === Retreiving events ===");

    let events = await retreiveData(session, "/api/events", 0);

    events = events.data;

    console.log("\x1b[92m%s\x1b[0m", "[INFO] === Retreiving employees ===");

    const allemployees = await retreiveData(session, "/api/employees", 0);

    await Promise.all(allemployees.data.map(async (employee, i) => {
        try {
            const response = await retreiveData(session, `/api/employees/${employee.id}`, "id");

            const imageResponse = await session.get(`/api/employees/${employee.id}/image`, {
                responseType: "arraybuffer"
            });
            fs.writeFileSync(UPLOAD_PATH + `employees/${employee.id}.png`, imageResponse.data);

            const employeeObject = await Employee.upsert({
                id: response.data.id,
                email: response.data.email,
                password: (response.data.email === process.env.REMOTE_API_EMAIL ? hashSync(process.env.REMOTE_API_PASSW, genSaltSync(10)) : null),
                type: (response.data.email === process.env.REMOTE_API_EMAIL ? (areWeManager ? employeeType.MANAGER : employeeType.COACH) : employeeType.COACH),
                name: response.data.name,
                surname: response.data.surname,
                birth_date: Date(response.data.birth_date),
                gender: response.data.gender,
                image_path: UPLOAD_PATH + `employees/${response.data.id}.png`,
                work: response.data.work,
            });

            const hisEvents = events.filter(event => event.employee_id == employee.id);
            await employeeObject[0].addEvents(hisEvents);
        } catch (err) {
            console.error("\x1b[31m%s\x1b[0m", `[ERROR] Could not retrieve data or image for employee ${employee.id}: ${err}`);
        }
    }));

    console.log("\x1b[92m%s\x1b[0m", "[INFO] === Retreiving customers ===");

    const allcustomers = await retreiveData(session, "/api/customers", 0);

    await Promise.all(allcustomers.data.map(async (customer, i) => {
        try {
            let clothes = await retreiveData(session, `/api/customers/${customer.id}/clothes`, 0).data;
            let payments = await retreiveData(session, `/api/customers/${customer.id}/payments_history`, 0).data;
            let encounters = await retreiveData(session, `/api/encounters/customer/${customer.id}`, 0).data;
            const response = await retreiveData(session, `/api/customers/${customer.id}`, "id");

            let clothes_array = [];

            for (let clothe in clothes)
                clothes_array.push(await addClothe(session, clothes[clothe].type, clothes[clothe].id));

            let encounters_array = [];

            for (let encounter in encounters)
                encounters_array.push((await Encounter.upsert(encounters[encounter]))[0]);

            let payments_array = [];

            for (let payment in payments)
                payments_array.push((await Payment.upsert(payments[payment]))[0]);

            const imageResponse = await session.get(`/api/customers/${customer.id}/image`, {
                responseType: "arraybuffer"
            });
            fs.writeFileSync(UPLOAD_PATH + `customers/${customer.id}.png`, imageResponse.data);

            let userObject = await Customer.upsert({
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

            await userObject[0].addClothings(clothes_array);
            await userObject[0].addPayments(payments_array);
            await userObject[0].addEncounters(encounters_array);
        } catch (err) {
            console.error("\x1b[31m%s\x1b[0m", `[ERROR] Could not retrieve data or image for customer ${customer.id}: ${err}`);
        }
    }));
}

fetchDB();
