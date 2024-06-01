import express from 'express';
import {
    DeleteAvatar,
    updateAvatar,
    addPhotographer,
    deletePhotographer,
    getSingle,
    getAll,
    getMyProfile,
    updatePhotographer
} from '../controllers/photographerControllers.js';
import { uploadPhotographer } from '../middlewares/uploadFiles.js';
import { isAuthenticated, isAuthorized } from '../middlewares/auth.js';
const PhotographerRouter = express.Router();

PhotographerRouter.get("/get", isAuthenticated, isAuthorized, getAll);
PhotographerRouter.get("/profile", isAuthenticated, getMyProfile);
PhotographerRouter.post("/add/photographer", isAuthenticated, isAuthorized, addPhotographer);
PhotographerRouter.post("/single/:id", isAuthenticated, getSingle);
PhotographerRouter.put("/update/:id", isAuthenticated, isAuthorized, updatePhotographer);
PhotographerRouter.put("/update/avatar/:id", isAuthenticated, uploadPhotographer, updateAvatar);
PhotographerRouter.delete("/delete/avatar/:id", isAuthenticated, DeleteAvatar);
PhotographerRouter.delete("/delete/:id", isAuthenticated, isAuthorized, deletePhotographer);

export default PhotographerRouter;