import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandeler } from "../middlewares/error.js";
import { Service } from "../models/serviceModel.js";

//getting all services
export const getAll = catchAsyncError(async (req, res, next) => {
    const services = await Service.find({});
    if (services) {
        res.status(200).json({
            services,
            success: true
        });
    } else {
        return next(new ErrorHandeler("No services found!", 400));
    }
});

//getting singe service (for update and delete)
export const getSingle = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (service) {
        res.status(200).json({
            service,
            success: true
        });
    } else {
        return next(new ErrorHandeler("No services found!", 404));
    }
});

//adding service
export const addService = catchAsyncError(async (req, res, next) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return next(new ErrorHandeler("All the fields are necessary!", 400));
    }
    const isAlreadyPresent = await Service.find({ title });
    if (isAlreadyPresent.length > 0) {
        return next(new ErrorHandeler("Service with this title is already present!", 400));
    }
    await Service.create({ title, description });
    res.status(200).json({
        message: "Service added successfully!",
        success: true
    });
});

//update service
export const updateService = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    await Service.findByIdAndUpdate(id, data);
    res.status(200).json({
        message: "Service updated successfully!",
        success: true
    });
});

//deleting service
export const deleteService = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    await Service.findByIdAndDelete(id);
    res.status(200).json({
        message: "Service deleted successfully!",
        success: true
    });
});