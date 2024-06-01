import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandeler } from "../middlewares/error.js";
import { Social } from "../models/SocialModel.js";

//getting all socials's data
export const getAll = catchAsyncError(async (req, res, next) => {
    const socials = await Social.find({});
    res.status(200).json({
        socials,
        success: true
    });
});

//updating social's data
export const updateSocials = catchAsyncError(async (req, res, next) => {
    const data = req.body;
    if (!data) {
        return next(new ErrorHandeler("No data supplied!", 400));
    }
    await Social.updateMany({}, { $set: data });
    res.status(200).json({
        message: "Social links updated successfully!",
        success: true
    });
});