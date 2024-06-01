import multer from 'multer';
import path from 'path';

//for storing photographer's avatar
const PhotographerStorage = multer.diskStorage({
    destination: './uploads/photographers',
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

//for storing post images
const PostStorage = multer.diskStorage({
    destination: './uploads/posts',
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

//for storing portfolio images
const PortfolioStorage = multer.diskStorage({
    destination: './uploads/portfolioes',
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

//for storing testimony images
const TestimonyStorage = multer.diskStorage({
    destination: './uploads/testimonies',
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

//for storing blog images
const BlogStorage = multer.diskStorage({
    destination: './uploads/blogs',
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

//for storing layout images
const LayoutStorage = multer.diskStorage({
    destination: './layout',
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});


export const uploadPhotographer = multer({ storage: PhotographerStorage }).single('avatar');
export const uploadPost = multer({ storage: PostStorage }).single('image');
export const uploadTestimony = multer({ storage: TestimonyStorage }).single('image');
export const uploadPortfolio = multer({ storage: PortfolioStorage }).single('image');
export const uploadBlog = multer({ storage: BlogStorage }).single('image');
export const uploadDarkLogo = multer({ storage: LayoutStorage }).single('darkLogo');
export const uploadLightLogo = multer({ storage: LayoutStorage }).single('lightLogo');
export const uploadBanner = multer({ storage: LayoutStorage }).single('banner');