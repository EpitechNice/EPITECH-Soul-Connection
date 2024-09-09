import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js"
import clothing from "../models/clothingModel.js"


//Wardrobe : /api/wardrobe
export const getClothing = catchAsyncErrors(async(req, res, next) => {
    try {
        const hat = await Clothing.findAll({
            where: {type: "hat/cap"}
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
//Get an item of clothing image
export const getClothingImg = catchAsyncErrors(async(req, res, next) => {
    const clothes = await Clothing.findByPk(req?.params?.id);

    if (!clothes) {
        return next(new ErrorHandler("Clothing not found", 404));
    }

    res.status(200).json({
        image: clothes.image_path,
    });
});