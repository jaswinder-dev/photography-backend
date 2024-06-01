import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.js";
import { ErrorHandeler } from "./error.js";
import { Photographer } from "../models/photographerModel.js";

//authentication
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const token = ((req.headers.data).split(";")[0]).split("=").pop();
    if (!token || token === "") {
        return next(new ErrorHandeler("You are not authenticated to access this resource!", 400));
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.photographer = await Photographer.findById(decoded.id);
    next();
});

//authorozation (allow access to photographer with role = "Admin")
export const isAuthorized = catchAsyncError(async (req, res, next) => {
    if (req.photographer.role !== "Admin") {
        return next(new ErrorHandeler("You are not authorized to access this resource!", 400));
    }
    next();
});