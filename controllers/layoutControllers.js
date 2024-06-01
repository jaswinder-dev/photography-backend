import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandeler } from "../middlewares/error.js";
import { Layout } from "../models/layoutModel.js";
import fs from 'fs';

//getting full information
export const getLayout = catchAsyncError(async (req, res, next) => {
    const layout = await Layout.find({});
    res.status(200).json({
        layout,
        success: true
    });
});

//updating dark logo
export const updateDarkLogo = catchAsyncError(async (req, res, next) => {
    let logo = "";
    if (process.env.NODE_ENV === 'development') {
        logo = `http://${process.env.HOST}:${process.env.PORT}/${req.file.filename}`;
    } else {
        logo = `https://${req.hostname}/${req.file.filename}`;
    }
    const prevLogo = ((await Layout.find({}))[0].darkLogo).split("/").pop();
    await Layout.updateOne({ darkLogo: logo });
    fs.unlinkSync(`./layout/${prevLogo}`);
    res.status(200).json({
        message: "Dark logo updated successfully!",
        success: true
    });
});

//updating light logo
export const updateLightLogo = catchAsyncError(async (req, res, next) => {
    let logo = "";
    if (process.env.NODE_ENV === 'development') {
        logo = `http://${process.env.HOST}:${process.env.PORT}/${req.file.filename}`;
    } else {
        logo = `https://${req.hostname}/${req.file.filename}`;
    }
    const prevLogo = ((await Layout.find({}))[0].lightLogo).split("/").pop();
    await Layout.updateOne({ lightLogo: logo });
    fs.unlinkSync(`./layout/${prevLogo}`);
    res.status(200).json({
        message: "Light logo updated successfully!",
        success: true
    });
});

//updating banner
export const updateBanner = catchAsyncError(async (req, res, next) => {
    let banner = "";
    if (process.env.NODE_ENV === 'development') {
        banner = `http://${process.env.HOST}:${process.env.PORT}/${req.file.filename}`;
    } else {
        banner = `https://${req.hostname}/${req.file.filename}`;
    }
    const prevBanner = ((await Layout.find({}))[0].banner).split("/").pop();
    await Layout.updateOne({ banner });
    fs.unlinkSync(`./layout/${prevBanner}`);
    res.status(200).json({
        message: "Banner updated successfully!",
        success: true
    });
});

//updating introduction
export const updateIntro = catchAsyncError(async (req, res, next) => {
    const { intro } = req.body;
    if (!intro) {
        return next(new ErrorHandeler("No data supplied!", 400));
    }
    await Layout.updateOne({ intro });
    res.status(200).json({
        message: "Intro updated successfully!",
        success: true
    });
});

//updating services introduction
export const updateServiceIntro = catchAsyncError(async (req, res, next) => {
    const { servicesIntro } = req.body;
    if (!servicesIntro) {
        return next(new ErrorHandeler("No data supplied!", 400));
    }
    await Layout.updateOne({ servicesIntro });
    res.status(200).json({
        message: "Service intro updated successfully!",
        success: true
    });
});

//updating footer
export const updateFooter = catchAsyncError(async (req, res, next) => {
    const { footer } = req.body;
    if (!footer) {
        return next(new ErrorHandeler("No data supplied!", 400));
    }
    await Layout.updateOne({ footer });
    res.status(200).json({
        message: "Footer updated successfully!",
        success: true
    });
});