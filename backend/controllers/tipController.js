import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js"
import Tip from "../models/tipModel.js"

// Display all tips: /api/tips
export const getTips = catchAsyncErrors(async (req, res, next) => {
    try {
        const tips = await Tip.findAll({});

        res.status(200).json({
            tips,
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while fetching tips", 500));
    }
});

// Create new tip: /api/tips
export const createTip = catchAsyncErrors(async (req, res) => {
    try {
        const newTip = await Tip.create({
            title: req.body?.title,
            tip: req.body?.tip,
        });

        res.status(201).json({
            message: "New tip created successfully",
            newTip,
        });

    } catch (err) {
        console.error(err);
        res.status(400).json({
            error: "Failed to create tip",
            details: err.message
        });
    }
});

// Update specific tip: /api/tips/:id
export const updateTip = catchAsyncErrors(async(req, res, next) => {
    let tip = await Tip.findByPk(req?.params?.id);

    if (!tip)
        return next(new ErrorHandler("Tip not found", 404));

    const updatedTip = await tip.update({
        title: req.body.title,
        tip: req.body.tip,
    });

    res.status(200).json({
        updatedTip,
    });
});

// Delete specific tip: /api/tips/:id
export const deleteTip = catchAsyncErrors(async(req, res, next) => {
    const tip = await Tip.findByPk(req?.params?.id);

    if (!tip)
        return next(new ErrorHandler("Tip not found", 404));

    await tip.destroy();

    res.status(200).json({
        message: "Tip deleted",
    });
});