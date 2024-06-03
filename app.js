import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middlewares/error.js';
import PhotographerRouter from './routers/photographerRouter.js';
import PostRouter from './routers/postRouter.js';
import PortfolioRouter from './routers/portfolioRouter.js';
import ServiceRouter from './routers/serviceRouter.js';
import TestimonyRouter from './routers/testimonyRouter.js';
import BlogRouter from './routers/blogRouter.js';
import LayoutRouter from './routers/layoutRouter.js';
import SocialRouter from './routers/socialRouter.js';
import AccountRouter from './routers/accountRouter.js';

dotenv.config({ path: './.env' });
const app = express();
app.use(cookieParser());
app.use(cors({
    origin: "*",
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//exposing the folders containing images
app.use("/", express.static("uploads/photographers"));
app.use("/", express.static("uploads/posts"));
app.use("/", express.static("uploads/testimonies"));
app.use("/", express.static("uploads/blogs"));
app.use("/", express.static("uploads/portfolioes"));
app.use("/", express.static("layout"));

//routers
app.use("/photographer/api", PhotographerRouter);
app.use("/post/api", PostRouter);
app.use("/portfolio/api", PortfolioRouter);
app.use("/service/api", ServiceRouter);
app.use("/testimony/api", TestimonyRouter);
app.use("/blog/api", BlogRouter);
app.use("/layout/api", LayoutRouter);
app.use("/social/api", SocialRouter);
app.use("/account/api", AccountRouter);

//middleware for error-handeling
app.use(ErrorMiddleware);
export default app;



