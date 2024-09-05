import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

import Clothe from "./models/clotheModel.js";
import Encounter from "./models/encounterModel.js";
import Event from "./models/eventModel.js";
import Payment from "./models/paymentModel.js";
import Tip from "./models/tipModel.js";
import User from "./models/userModel.js";

import { createDB } from "./config/dbCreate.js";

import * as fs from "fs";

const UPLOAD_PATH = "/usr/src/app/images/";

const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );

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
        timeout: 20000
    }));

    console.log("\x1b[32m%s\x1b[0m", "[INFO] Starting script. Note: this ain't threaded (unlike the Python version). It might take a long time.");

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

    const me = await session.get("/api/employees/me");

    console.log("\x1b[32m%s\x1b[0m", `[INFO] Hello ${me.data.name} ${me.data.surname}`);

    const allemployees = await session.get("/api/employees");

    let employees = [];

    await Promise.all(allemployees.data.map(async (employee, i) => {
        console.log("\x1b[32m%s\x1b[0m", `[INFO] Retreiving employee ${i + 1}/${allemployees.data.length}`);

        try {
            const response = await session.get(`/api/employees/${employee.id}`);
            employees.push({
                id: response.data.id,
                email: response.data.email,
                type: "Coach",
                name: response.data.name,
                surname: response.data.surname,
                birth_date: Date(response.data.birth_date),
                gender: response.data.gender,
                image_path: UPLOAD_PATH + `employees/${response.data.id}.png`,
                work: response.data.work
            });

            const imageResponse = await session.get(`/api/employees/${employee.id}/image`, {
                responseType: "arraybuffer"
            });
            fs.writeFileSync(UPLOAD_PATH + `employees/${employee.id}.png`, imageResponse.data);

        } catch (err) {
            console.error("\x1b[31m%s\x1b[0m", `[ERROR] Could not retrieve data or image for employee ${employee.id}: ${err}`);
        }
    }));

    employees = chunk(employees, 64);

    for (let index in employees)
        await User.bulkCreate(employees[index]);

    const allcustomers = await session.get("/api/customers");

    let customers = [];

    await Promise.all(allcustomers.data.map(async (customer, i) => {
        console.log("\x1b[32m%s\x1b[0m", `[INFO] Retreiving customer ${i + 1}/${allcustomers.data.length}`);

        try {
            let clothes = await session.get(`/api/customers/${customer.id}/clothes`).data;
            let payments = (await session.get(`/api/customers/${customer.id}/payments_history`)).data;
            const response = await session.get(`/api/customers/${customer.id}`);

            for (let clothe in clothes) {
                const imageResponse = await session.get(`/api/clothes/${clothe.id}/image`, {
                    responseType: "arraybuffer"
                });
                fs.writeFileSync(UPLOAD_PATH + `clothes/${clothe.id}.png`, imageResponse.data);
                await Clothe.upsert({
                    id: clothe.id,
                    type: clothe.type,
                    image_path: `clothes/${clothe.id}.png`
                }, {
                    conflictFields: [ 'id' ],
                });
            }

            payments = chunk(payments, 64);

            for (let payment in payments)
                Payment.bulkCreate(payments[payment])

            const user = await User.create({
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

            user.clothes = clothes;

            const imageResponse = await session.get(`/api/customers/${customer.id}/image`, {
                responseType: "arraybuffer"
            });
            fs.writeFileSync(UPLOAD_PATH + `customers/${customer.id}.png`, imageResponse.data);

        } catch (err) {
            console.error("\x1b[31m%s\x1b[0m", `[ERROR] Could not retrieve data or image for customer ${employee.id}: ${err}`);
        }
    }));

    employees = chunk(employees, 64);

    for (let index in employees)
        await User.bulkCreate(employees[index]);


}

fetchDB();