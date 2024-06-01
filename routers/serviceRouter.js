import express from 'express';
import { isAuthenticated, isAuthorized } from '../middlewares/auth.js';
import {
    addService,
    deleteService,
    getAll,
    getSingle,
    updateService
} from '../controllers/serviceController.js';
const ServiceRouter = express.Router();

ServiceRouter.get("/get", isAuthenticated, isAuthorized, getAll);
ServiceRouter.get("/get/fontend", getAll);
ServiceRouter.post("/get/single/:id", isAuthenticated, isAuthorized, getSingle);
ServiceRouter.post("/add/service", isAuthenticated, isAuthorized, addService);
ServiceRouter.put("/update/:id", isAuthenticated, isAuthorized, updateService);
ServiceRouter.delete("/delete/:id", isAuthenticated, isAuthorized, deleteService);

export default ServiceRouter;