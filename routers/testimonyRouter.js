import express from "express";
import { isAuthenticated } from "../middlewares/auth.js"
import {
    addTestimony,
    deleteTestimony,
    getForFrontEnd,
    getSingle,
    getAll,
    updateTestimony
} from '../controllers/testimonyController.js';
import { uploadTestimony } from "../middlewares/uploadFiles.js";
const TestimonyRouter = express.Router();

TestimonyRouter.get("/get/reader", getForFrontEnd);
TestimonyRouter.get("/get", isAuthenticated, getAll);
TestimonyRouter.post("/get/single/:id", isAuthenticated, getSingle);
TestimonyRouter.post("/add/testimony", isAuthenticated, uploadTestimony, addTestimony);
TestimonyRouter.put("/update/:id", isAuthenticated, updateTestimony);
TestimonyRouter.delete("/delete/:id", isAuthenticated, deleteTestimony);

export default TestimonyRouter;