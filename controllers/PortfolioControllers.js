import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandeler } from "../middlewares/error.js"
import { Portfolio } from "../models/PortfolioModel.js";
import { Photographer } from "../models/photographerModel.js";
import { Post } from "../models/postModel.js";
import fs from 'fs';

//getting portfolios for admin and for frontend
export const getAll = catchAsyncError(async (req, res, next) => {
    const portfolioes = await Portfolio.find({});
    res.status(200).json({
        portfolioes,
        success: true
    });
});

//getting single portfolio (for update and delete)
export const getSingle = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const portfolio = await Portfolio.findById(id);
    if (portfolio) {
        res.status(200).json({
            portfolio,
            success: true
        });
    } else {
        return next(new ErrorHandeler("No portfolioes found!", 404));
    }
});

//adding portfolio
export const addPortfolio = catchAsyncError(async (req, res, next) => {
    const { title } = req.body;
    let image = "";
    if (process.env.NODE_ENV === 'development') {
        image = `http://${process.env.HOST}:${process.env.PORT}/${req.file.filename}`;
    } else {
        image = `https://${req.hostname}/${req.file.filename}`;
    }
    if (!title) {
        return next(new ErrorHandeler("No data supplied!", 400));
    }
    const doesAlreadyExist = await Portfolio.find({ title });
    if (doesAlreadyExist.length > 0) {
        return next(new ErrorHandeler("This portfolio already exits!", 400));
    }
    await Portfolio.create({ title, image });
    res.status(200).json({
        message: "Portfolio added successfully!",
        success: true
    });
});

//updating portfolio
export const updatePortfolio = catchAsyncError(async (req, res, next) => {
    const { title } = req.body;
    const { id } = req.params;
    if (!title) {
        return next(new ErrorHandeler("No data supplied!", 400));
    }
    const doesAlreadyExist = await Portfolio.find({ title });
    if (doesAlreadyExist.length > 0) {
        return next(new ErrorHandeler("This portfolio already exits!", 400));
    }
    await Portfolio.findByIdAndUpdate(id, { title });
    res.status(200).json({
        message: "Portfolio updated successfully!",
        success: true
    });
});

//deleting portfolio
export const deletePortfolio = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const portfolio = (await Portfolio.findById(id));
    const portfolioImage = (portfolio.image).split("/").pop();
    const isDeleted = await Portfolio.findByIdAndDelete(id);
    fs.unlinkSync(`./uploads/portfolioes/${portfolioImage}`);
    if (isDeleted) {
        const postsOfPortfolio = (await Post.find({ portfolio: id }));
        postsOfPortfolio.forEach(async (post) => {
            let photographerId = post.photographer;
            let no_of_posts = (await Photographer.findById(photographerId)).posts;
            no_of_posts -= 1;
            await Photographer.findByIdAndUpdate(photographerId, { posts: no_of_posts });
            const image = (post.image).split("/").pop();
            fs.unlinkSync(`./uploads/posts/${image}`);
        });
        await Post.deleteMany({ portfolio: id });
    }
    res.status(200).json({
        message: "Portfolio deleted successfully!",
        success: true
    });
});