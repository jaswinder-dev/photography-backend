import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandeler } from "../middlewares/error.js";
import { Photographer } from "../models/photographerModel.js";
import { setToken } from "../utils/setToken.js";

//logging in
export const login = catchAsyncError(async (req, res, next) => {
    const { username, password, email } = req.body;
    let data = {};

    if (!password) {
        return next(new ErrorHandeler("Password is necessary!", 400));
    }

    if (!username && !email) {
        return next(new ErrorHandeler("Username or Email must be supplied!", 400));
    }

    if (!username) {
        data = { email };
    } else {
        data = { username };
    }

    const photographer = await Photographer.findOne(data);

    if (!photographer || Object.keys(photographer).length === 0) {
        return next(new ErrorHandeler("Username or Password is wrong!", 400));
    }

    const isMatched = await photographer.comparePassword(password);
    if (!isMatched) {
        return next(new ErrorHandeler("Username or Password is wrong!", 400));
    }
    setToken(200, "Successfully logged in!", photographer, res);
});

//logging out
export const logout = catchAsyncError(async (req, res, next) => {
    const options = {
        expires: new Date(Date.now()),
        httpOnly: true
    };
    res.status(200).cookie("token", null, options).json({
        message: "Logged out successfully!",
        success: true
    });
});