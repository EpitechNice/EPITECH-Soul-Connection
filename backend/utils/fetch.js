import axios, { all } from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

import { hashSync, genSaltSync } from "bcrypt";

import Clothes from "../models/clothingModel.js";
import Encounter from "../models/encounterModel.js";
import Event from "../models/eventModel.js";
import Payment from "../models/paymentModel.js";
import Tip from "../models/tipModel.js";
import Employee, { employeeType } from "../models/employeeModel.js"
import Customer from "../models/customerModel.js"

import { createDB, delay } from "../config/dbCreate.js";

import * as fs from "fs";
import Clothing from "../models/clothingModel.js";

const SLEEP_TIME = 30 * 60;

const DEFAULT_IMAGE_PATH = "/usr/src/app/images/default.png";
const UPLOAD_PATH = "/usr/src/app/images/";
const areWeManager = true;

const parse_unicode_into_ascii = {'à': 'a', 'ç': 'c', 'é': 'e', 'è': 'e', 'ù': 'u', 'ô': 'o', 'î': 'i', 'ï': 'i', 'À': 'A', 'Ç': 'C', 'É': 'E', 'È': 'E', 'Ù': 'U', 'Ô': 'O', 'Î': 'I', 'Ï': 'I'}

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
    if (clothe !== null)
        return clothe;
    const imageResponse = await session.get(`/api/clothes/${id}/image`, {
        responseType: "arraybuffer"
    });
    fs.writeFileSync(UPLOAD_PATH + `clothes/${id}.png`, imageResponse.data);
    return await Clothes.create({
        id: id,
        type: type,
        image_path: UPLOAD_PATH + `clothes/${id}.png`
    });
}

async function addEncounter(session, id) {
    let response = await retreiveData(session, `/api/encounters/${id}`, "comment");
    return await Encounter.upsert(response.data);
}

function makeAscii(data) {
    let asciiText = '';

    for (let i = 0; i < data.length; i++) {
        const char = data[i];

        if (parse_unicode_into_ascii[char]) {
            asciiText += parse_unicode_into_ascii[char];
        } else {
            asciiText += char;
        }
    }
    return asciiText;
}

function clearOfId(items, idsToRemove) {
    let clearedItems = items;
    for (let id in idsToRemove) {
        try {
            clearedItems = clearedItems.filter(item => item.id !== idsToRemove[id]);
        } catch(err) {
            console.log(clearedItems);
        }
    }
    return clearedItems;
}

function getIds(items) {
    return items.map(item => item.id);
}

function parseDate(date) {
    var parts = date.split('-');
    return new Date(parts[0], parts[1] - 1, parts[2]);
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

    // Actual downloads

    console.log("\x1b[92m%s\x1b[0m", "[INFO] === Retreiving tips ===");

    try {
        let alltips = (await retreiveData(session, "/api/tips", 0)).data;
        alltips = clearOfId(alltips, getIds((await Tip.findAll())));

        for (var index in alltips)
            await Tip.upsert(alltips[index]);
    } catch (err) {
        console.error("\x1b[31m%s\x1b[0m", `[ERROR] Could not retrieve tips: ${err}`);
    }

    console.log("\x1b[92m%s\x1b[0m", "[INFO] === Retreiving events ===");

    let events = (await retreiveData(session, "/api/events", 0)).data;
    events = clearOfId(events, getIds((await Event.findAll())));

    for (let event in events) {
        try {
            const eventData = (await retreiveData(session, `/api/events/${events[event].id}`, "id")).data;
            await Event.upsert({
                ...eventData,
                location_name: makeAscii(eventData.location_name),
            });
        } catch (err) {
            console.error("\x1b[31m%s\x1b[0m", `[ERROR] Could not retrieve data for event ${events[event].id}: ${err}`);
        }
    }

    console.log("\x1b[92m%s\x1b[0m", "[INFO] === Retreiving employees ===");

    let allEmployees = (await retreiveData(session, "/api/employees", 0)).data;
    allEmployees = clearOfId(allEmployees, getIds((await Employee.findAll())));

    console.log()

    await Promise.all(allEmployees.map(async (employee, i) => {
        try {
            const response = await retreiveData(session, `/api/employees/${employee.id}`, "id");

            let imageDownloaded = false;

            try {
                const imageResponse = await session.get(`/api/employees/${employee.id}/image`, {
                    responseType: "arraybuffer"
                });
                fs.writeFileSync(UPLOAD_PATH + `employees/${employee.id}.png`, imageResponse.data);
                imageDownloaded = true;
            } catch (err) {
                console.error("\x1b[31m%s\x1b[0m", `[ERROR] Could not retreive image: ${err}`);
            }

            const employeeObject = await Employee.upsert({
                id: response.data.id,
                email: response.data.email,
                password: (response.data.email === process.env.REMOTE_API_EMAIL ? hashSync(process.env.REMOTE_API_PASSW, genSaltSync(10)) : null),
                type: (response.data.email === process.env.REMOTE_API_EMAIL ? (areWeManager ? employeeType.MANAGER : employeeType.COACH) : employeeType.COACH),
                name: makeAscii(response.data.name),
                surname: makeAscii(response.data.surname),
                birth_date: parseDate(response.data.birth_date),
                gender: response.data.gender,
                image_path: (imageDownloaded ? UPLOAD_PATH + `employees/${response.data.id}.png` : DEFAULT_IMAGE_PATH),
                work: makeAscii(response.data.work),
            });
        } catch (err) {
            console.error("\x1b[31m%s\x1b[0m", `[ERROR] Could not retrieve data or image for employee ${employee.id}: ${err}`);
        }
    }));

    console.log("\x1b[92m%s\x1b[0m", "[INFO] === Retreiving customers ===");

    let allCustomers = (await retreiveData(session, "/api/customers", 0)).data;
    allCustomers = clearOfId(allCustomers, getIds((await Customer.findAll())));

    await Promise.all(allCustomers.map(async (customer, i) => {
        try {
            let clothes = (await retreiveData(session, `/api/customers/${customer.id}/clothes`, 0)).data;
            let payments = (await retreiveData(session, `/api/customers/${customer.id}/payments_history`, 0)).data;
            let encounters = (await retreiveData(session, `/api/encounters/customer/${customer.id}`, 0)).data;
            const response = await retreiveData(session, `/api/customers/${customer.id}`, "id");

            clothes = clearOfId(clothes, getIds((await Clothing.findAll())));
            payments = clearOfId(payments, getIds((await Payment.findAll())));
            encounters = clearOfId(encounters, getIds((await Encounter.findAll())));

            for (let clothe in clothes)
                await addClothe(session, clothes[clothe].type, clothes[clothe].id);

            for (let encounter in encounters)
                await addEncounter(session, encounters[encounter].id);

            for (let payment in payments)
                await Payment.upsert({
                    ...payments[payment],
                    user_id: customer.id
                });

            let imageDownloaded = false;

            try {
                const imageResponse = await session.get(`/api/customers/${customer.id}/image`, {
                    responseType: "arraybuffer"
                });
                fs.writeFileSync(UPLOAD_PATH + `customers/${customer.id}.png`, imageResponse.data);
                imageDownloaded = true;
            } catch (err) {
                console.error("\x1b[31m%s\x1b[0m", `[ERROR] Could not retreive image: ${err}`);
            }

            await Customer.upsert({
                id: response.data.id,
                email: response.data.email,
                type: "Client",
                name: makeAscii(response.data.name),
                surname: makeAscii(response.data.surname),
                birth_date: parseDate(response.data.birth_date),
                gender: response.data.gender,
                image_path: (imageDownloaded ? UPLOAD_PATH + `customers/${response.data.id}.png` : DEFAULT_IMAGE_PATH),
                astrological_sign: response.data.astrological_sign,
                description: makeAscii(response.data.description),
                phone_number: response.data.phone_number,
                address: makeAscii(response.data.address),
            });
        } catch (err) {
            console.error("\x1b[31m%s\x1b[0m", `[ERROR] Could not retrieve data or image for customer ${customer.id}: ${err}`);
        }
    }));
}

async function run_n_wait() {
    let start = performance.now();
    await fetchDB();
    console.log("\x1b[95m%s\x1b[0m", `=== Fetching remote DB successfull. Took ${Number(((performance.now() - start) / 1000).toFixed(2))}sec ===`);
    await delay(SLEEP_TIME * 1000);
}

run_n_wait();