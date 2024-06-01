import express from "express";
import { isAuthenticated, isAuthorized } from '../middlewares/auth.js';
import {
    addBlog,
    deleteBlog,
    getAll,
    getLatest,
    getSingle,
    updateBlog,
    updateBlogImg
} from "../controllers/blogControllers.js";
import { uploadBlog } from "../middlewares/uploadFiles.js";
const BlogRouter = express.Router();

BlogRouter.get("/get", isAuthenticated, isAuthorized, getAll);
BlogRouter.post("/get/frontend/:id", getSingle);
BlogRouter.post("/get/:id", isAuthenticated, isAuthorized, getSingle);
BlogRouter.get("/get/latest", getLatest);
BlogRouter.post("/add/blog", isAuthenticated, isAuthorized, uploadBlog, addBlog);
BlogRouter.put("/update/:id", isAuthenticated, isAuthorized, updateBlog);
BlogRouter.put("/update/image/:id", isAuthenticated, isAuthorized, uploadBlog, updateBlogImg);
BlogRouter.delete("/delete/:id", isAuthenticated, isAuthorized, deleteBlog);

export default BlogRouter;