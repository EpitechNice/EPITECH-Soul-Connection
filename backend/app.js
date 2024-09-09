import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createDB } from "./config/dbCreate.js";
import errorMiddleware from "./middlewares/errors.js";

const app = express();

//Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log('\x1b[31m%s\x1b[0m', `[ERROR] ${err}`);
    console.log('\x1b[34m%s\x1b[0m', "[INFO] Shutting down server due to Unhandled Promise Rejection");
    process.exit(1);
});

dotenv.config({path: 'backend/config/config.env'});

createDB();

//Json middleware
app.use(express.json({ limit: "10mb" }));

//Auth middleware
app.use(cookieParser());

//Import all routes
import employeeRoutes from "./routes/employeeRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import clothesRoutes from "./routes/clothesRoutes.js";
import tipRoutes from "./routes/tipRoutes.js";

app.use("/api", employeeRoutes);
app.use("/api", customerRoutes);
app.use("/api", clothesRoutes);
app.use("/api", tipRoutes);

//Using error middleware
app.use(errorMiddleware);

app.listen(process.env.LOCAL_PORT, () => {
    console.log('\x1b[34m%s\x1b[0m', `[INFO] Server started on the PORT: ${process.env.LOCAL_PORT} in ${process.env.NODE_ENV} mode`);
});

//Handle unheandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log('\x1b[31m%s\x1b[0m', `[ERROR] ${err.message}`);
    console.log('\x1b[34m%s\x1b[0m', "[INFO] Shutting down server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});