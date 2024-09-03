require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

const databaseUrl = `mysql://${dbUser}:${dbPass}@${dbHost}:3306/${dbName}`;