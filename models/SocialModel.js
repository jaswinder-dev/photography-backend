import mongoose from "mongoose";
import validator from "validator";
const SocialSchema = new mongoose.Schema({
    facebook: {
        type: String
    },
    instagram: {
        type: String
    },
    youtube: {
        type: String
    },
    linkedin: {
        type: String
    },
    twitter: {
        type: String
    },
    pinterest: {
        type: String
    },
    contact: {
        type: String
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide valid email address!"]
    },
    facebook: {
        type: String
    },
});

export const Social = mongoose.model('socials', SocialSchema);