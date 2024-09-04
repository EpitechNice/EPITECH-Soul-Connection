import express from "express";
const app = express()

//Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log('\x1b[31m%s\x1b[0m', `[ERROR] ${err}`);
    console.log('\x1b[34m%s\x1b[0m', "[INFO] Shutting down server due to Unhandled Promise Rejection");
    process.exit(1);
});

//Configure Express middleware to handle JSON req for routes
app.use(express.json({ limit: "10mb" }));

//Import all routes
import employeeRoutes from "./routes/employeeRoutes.js";

app.use("/api/", employeeRoutes);


//TODO : add port in env
const server = app.listen(process.env.BACK_PORT, () => {
    console.log('\x1b[34m%s\x1b[0m', `[INFO] Server started on the PORT: ${process.env.BACK_PORT}`);
});

//Handle unheandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log('\x1b[31m%s\x1b[0m', `[ERROR] ${err.message}`);
    console.log('\x1b[34m%s\x1b[0m', "[INFO] Shutting down server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});