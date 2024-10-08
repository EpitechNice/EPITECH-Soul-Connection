import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js"
import Clothing from "../models/clothingModel.js"
import path from "path";
import * as fs from "fs";

const DEFAULT_IMAGE_PATH = "/usr/src/app/images/default.png"

const mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

//Wardrobe : /api/wardrobe
export const getClothes = catchAsyncErrors(async(req, res, next) => {
    try {
        const hat = await Clothing.findAll({
            where: {type: "hat"}
        });

        const bottom = await Clothing.findAll({
            where: {type: "bottom"}
        });

        const top = await Clothing.findAll({
            where: {type: "top"}
        });

        const shoes = await Clothing.findAll({
            where: {type: "shoes"}
        });

        res.status(200).json({
            hat: hat,
            bottom: bottom,
            top: top,
            shoes: shoes,
        });

    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while fetching clothes", 500));
    }
});

//Get an item of clothing image: /api/clothes/:id/image
export const getClothingImg = catchAsyncErrors(async(req, res, next) => {
    const clothes = await Clothing.findByPk(req?.params?.id);

    if (!clothes) {
        return next(new ErrorHandler("Clothing not found", 404));
    }

    var imagePath = clothes.image_path;

    var type = mime[path.extname(imagePath).slice(1)] || 'text/plain';
    var s = fs.createReadStream(imagePath);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.status(404).end('Not found');
    });
});

//Create a clothing item: /clothes
export const createClothing = catchAsyncErrors(async (req, res) => {
    try {
        const modifiedBody = {
            ...req.body,
            image_path: DEFAULT_IMAGE_PATH,
        };

        const clothing = await Clothing.create(modifiedBody);

        res.status(201).json({
            message: "New clothing created successfully",
            clothing,
        });

    } catch (err) {
        console.error(err);
        res.status(400).json({
            error: "Failed to create clothing",
            details: err.message
        });
    }
});

export const updateClothing = catchAsyncErrors(async (req, res, next) => {
    let clothingId = req?.params?.id;

    const clothing = await Clothing.findByPk(clothingId);

    if (!clothing) {
        return next(new ErrorHandler(`Clothing '${clothingId}' not found`, 404));
    }

    try {
        const updatedClothing = await clothing.update(
            req.body,
            { returning: true }
        );

        res.status(200).json({
            message: "Clothing updated successfully",
            data: updatedClothing,
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while updating the clothing", err.status));
    }
});

//Delete clothing item: /clothes
export const deleteClothing = catchAsyncErrors(async (req, res, next) => {
    let id = req?.params?.id;

    if (!id || isNaN(id)) {
        return next(new ErrorHandler("Invalid clothing ID", 400));
    }

    const clothing = await Clothing.findByPk(id);

    if (!clothing)
        return next(new ErrorHandler(`Clothing '${id}' not found`, 404));

    try {
        const result = await clothing.destroy({
            returning: true
        });

        res.status(200).json({
            message: "Clothing deleted successfully",
            count: result[0]
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while deleting the clothing", 500));
    }
});