import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import {
    deletePost,
    addPost,
    getAll,
    getSingle,
    getSpecific,
    updateImage,
    updatePost,
    getById,
    getLatest,
    getByCondition
} from '../controllers/postController.js';
import { uploadPost } from '../middlewares/uploadFiles.js';

const PostRouter = express.Router();

PostRouter.get("/get", getAll);
PostRouter.get("/get/latest", getLatest);
PostRouter.get("/get/specific", isAuthenticated, getSpecific);
PostRouter.post("/get/individual/:id", getById);
PostRouter.post("/get/single/:id", isAuthenticated, getSingle);
PostRouter.post("/get/query/:condition", getByCondition);
PostRouter.post("/add/post", isAuthenticated, uploadPost, addPost);
PostRouter.put("/update/:id", isAuthenticated, updatePost);
PostRouter.put("/update/image/:id", isAuthenticated, uploadPost, updateImage);
PostRouter.delete("/delete/:id", isAuthenticated, deletePost);

export default PostRouter;