import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js"
import Event from "../models/eventModel.js"

// Display all events: /api/events
export const getEvents = catchAsyncErrors(async (req, res, next) => {
    try {
        const events = await Event.findAll({});

        res.status(200).json({
            events,
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while fetching events", 500));
    }
});

//TODO: 422 Validation Error
// Get specific event: /api/events/:id
export const getEventDetails = catchAsyncErrors(async (req, res, next) => {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
        return next(new ErrorHandler("Event requested doesn't exist", 404));
    }

    res.status(200).json({
        event,
    });
});

// Create new event: /api/events
export const createEvent = catchAsyncErrors(async (req, res) => {
    try {
        const newEvent = await Event.create({
            id: req.body?.id,
            name: req.body?.name,
            date: new Date(req.body?.date),
            max_participants: req.body?.max_participants,
            location_x: req.body?.location_x,
            location_y: req.body?.location_y,
            type: req.body?.type,
            employee_id: req.body?.employee_id,
            location_name: req.body?.location_name,
        });

        res.status(201).json({
            message: "New event created successfully",
            newEvent,
        });

    } catch (err) {
        console.error(err);
        res.status(400).json({
            error: "Failed to create event",
            details: err.message
        });
    }
});

// Update specific event: /api/events/:id
export const updateEvent = catchAsyncErrors(async(req, res, next) => {
    let event = await Event.findByPk(req?.params?.id);

    if (!event)
        return next(new ErrorHandler("Event not found", 404));

    const updatedEvent = await event.update({
        id: req.body?.id,
        name: req.body?.name,
        date: req.body?.date,
        max_participants: req.body?.max_participants,
        location_x: req.body?.location_x,
        location_y: req.body?.location_y,
        type: req.body?.type,
        employee_id: req.body?.employee_id,
        location_name: req.body?.location_name,
    });

    res.status(200).json({
        updatedEvent,
    });
});

// Delete specific event: /api/events/:id
export const deleteEvent = catchAsyncErrors(async(req, res, next) => {
    const event = await Event.findByPk(req?.params?.id);

    if (!event)
        return next(new ErrorHandler("Event not found", 404));

    await event.destroy();

    res.status(200).json({
        message: "Event deleted",
    });
});