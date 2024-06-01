import express from 'express';
import { getAll, updateSocials } from '../controllers/socialControllers.js';
const SocialRouter = express.Router();

SocialRouter.get("/get", getAll);
SocialRouter.put("/update", updateSocials);

export default SocialRouter;