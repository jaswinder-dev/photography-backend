import express from 'express';
import {
    getLayout,
    updateBanner,
    updateDarkLogo,
    updateFooter,
    updateIntro,
    updateLightLogo,
    updateServiceIntro
} from '../controllers/layoutControllers.js';
import { uploadBanner, uploadDarkLogo, uploadLightLogo } from '../middlewares/uploadFiles.js';
const LayoutRouter = express.Router();

LayoutRouter.get("/get", getLayout);
LayoutRouter.put("/update/dark/logo", uploadDarkLogo, updateDarkLogo);
LayoutRouter.put("/update/light/logo", uploadLightLogo, updateLightLogo);
LayoutRouter.put("/update/banner", uploadBanner, updateBanner);
LayoutRouter.put("/update/intro", updateIntro);
LayoutRouter.put("/update/service/intro", updateServiceIntro);
LayoutRouter.put("/update/footer", updateFooter);

export default LayoutRouter;