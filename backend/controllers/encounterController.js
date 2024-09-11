import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js"
import Encounter from "../models/encounterModel.js"
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

//Wardrobe : /api/encounters
export const getEncounters = catchAsyncErrors(async(req, res, next) => {
    try {
        res.status(200).json(await Encounter.findAll());
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while fetching encounter", 500));
    }
});

// /api/encounter/:id
export const getEncounterDetails = catchAsyncErrors(async(req, res, next) => {
    try {
        const id = req?.params?.id;
        const encounter = await Encounter.findOne({
            where: {
                id: id
            }
        })

        if (!encounter)
            return next(new ErrorHandler(`Encounter '${id}' not found`, 404));

        res.status(200).json(encounter);
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while fetching encounter", 500));
    }
});

//Create a encounter item: /encounter
export const createEncounter = catchAsyncErrors(async (req, res) => {
    try {
        const encounter = await Encounter.create(req.body);

        res.status(201).json({
            message: "New encounter created successfully",
            encounter,
        });

    } catch (err) {
        console.error(err);
        res.status(400).json({
            error: "Failed to create encounter",
            details: err.message
        });
    }
});

export const updateEncounter = catchAsyncErrors(async (req, res, next) => {
    let encounterId = req?.params?.id;

    const encounter = await Encounter.findByPk(encounterId);

    if (!encounter)
        return next(new ErrorHandler(`Encounter '${encounterId}' not found`, 404));

    try {
        const updatedEncounter = await encounter.update(
            req.body,
            { returning: true }
        );

        res.status(200).json({
            message: "Encounter updated successfully",
            data: updatedEncounter,
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while updating the encounter", err.status));
    }
});

//Delete encounter item: /encounter
export const deleteEncounter = catchAsyncErrors(async (req, res, next) => {
    let id = req?.params?.id;

    if (!id || isNaN(id))
        return next(new ErrorHandler("Invalid encounter ID", 400));

    const encounter = await Encounter.findByPk(id);

    if (!encounter)
        return next(new ErrorHandler(`Encounter '${id}' not found`, 404));

    try {
        const result = await encounter.destroy({
            returning: true
        });

        res.status(200).json({
            message: "Encounter deleted successfully",
            count: result[0]
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while deleting the encounter", 500));
    }
});