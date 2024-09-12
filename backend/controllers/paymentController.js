import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js"
import Payment from "../models/paymentModel.js"
import Customer from "../models/customerModel.js"
import path from "path";
import * as fs from "fs";

//Wardrobe : /api/wardrobe
export const getPayments = catchAsyncErrors(async(req, res, next) => {
    try {
        const payments = await Payment.findAll();

        res.status(200).json(payments);

    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while fetching clothes", 500));
    }
});

//Get an item of payment image: /api/clothes/:id/image
export const getPaymentsByCustomer = catchAsyncErrors(async(req, res, next) => {
    try {
        const customer = await Customer.findByPk(req?.params?.id);

        if (!clothes) {
            return next(new ErrorHandler("Customer not found", 404));
        }

        const payments = await Payment.findAll({
            where: {
                user_id: customer.id
            }
        });

        res.status(200).json(payments);
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while fetching clothes", 500));
    }
});

//Create a payment item: /clothes
export const createPayment = catchAsyncErrors(async (req, res) => {
    try {
        const payment = await Payment.create(req.body);

        res.status(201).json({
            message: "New payment created successfully",
            payment,
        });

    } catch (err) {
        console.error(err);
        res.status(400).json({
            error: "Failed to create payment",
            details: err.message
        });
    }
});

export const updatePayment = catchAsyncErrors(async (req, res, next) => {
    let paymentId = req?.params?.id;

    const payment = await Payment.findByPk(paymentId);

    if (!payment) {
        return next(new ErrorHandler(`Payment '${paymentId}' not found`, 404));
    }

    try {
        const updatedPayment = await payment.update(
            req.body,
            { returning: true }
        );

        res.status(200).json({
            message: "Payment updated successfully",
            data: updatedPayment,
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while updating the payment", err.status));
    }
});

//Delete payment item: /clothes
export const deletePayment = catchAsyncErrors(async (req, res, next) => {
    let id = req?.params?.id;

    if (!id || isNaN(id)) {
        return next(new ErrorHandler("Invalid payment ID", 400));
    }

    const payment = await Payment.findByPk(id);

    if (!payment)
        return next(new ErrorHandler(`Payment '${id}' not found`, 404));

    try {
        const result = await payment.destroy({
            returning: true
        });

        res.status(200).json({
            message: "Payment deleted successfully",
            count: result[0]
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while deleting the payment", 500));
    }
});