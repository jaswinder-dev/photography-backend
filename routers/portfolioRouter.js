import express from "express";
import { isAuthenticated, isAuthorized } from '../middlewares/auth.js'
import {
    addPortfolio,
    deletePortfolio,
    getAll,
    getSingle,
    updatePortfolio
} from "../controllers/PortfolioControllers.js";
import { uploadPortfolio } from "../middlewares/uploadFiles.js";
const PortfolioRouter = express.Router();

PortfolioRouter.get("/get/frontend", getAll);
PortfolioRouter.get("/get", isAuthenticated, getAll);
PortfolioRouter.post("/get/:id", isAuthenticated, isAuthorized, getSingle);
PortfolioRouter.post("/add/portfolio", isAuthenticated, isAuthorized, uploadPortfolio, addPortfolio);
PortfolioRouter.put("/update/:id", isAuthenticated, isAuthorized, updatePortfolio);
PortfolioRouter.delete("/delete/:id", isAuthenticated, isAuthorized, deletePortfolio);

export default PortfolioRouter;