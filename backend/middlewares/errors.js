import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
    let error = {
        statusCode: err?.statusCode || 500,
        message: err?.message || "Internal Server Error",
    };

    // Handle Invalid Sequelize ID Error
    if (err instanceof Sequelize.ValidationError) {
        const message = `Resource not found. Invalid ${err.path}`;
        error = new ErrorHandler(message, 404);
    }

    //Handle Validation Error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((value) => value.message);
        error = new ErrorHandler(message, 422);
    }

    //Handle JWT Error
    if (err.name === "JsonWebTokenError") {
        const message = "Invalid JSON Web Token";
        error = new ErrorHandler(message, 400);
    }

    //Handle expired JWT Error
    if (err.name === "TokenExpiredError") {
        const message = "Expired JSON Web Token";
        error = new ErrorHandler(message, 400);
    }

    if (process.env.NODE_ENV === "DEV") {
        res.status(error.statusCode).json({
            message: error.message,
            error: err,
            stack: err?.stack,
        });
    }

    if (process.env.NODE_ENV === "PROD") {
        res.status(error.statusCode).json({
            message: error.message,
        });
    }
};
