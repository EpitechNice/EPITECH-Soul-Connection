import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js"
import Clothing from "../models/clothingModel.js"
import path from "path";
import * as fs from "fs";

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

//TODO: 422 Validation error
//DONE: Gives back the actual image data instead of it's path on the docker (not relevent)
//Get an item of clothing image
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