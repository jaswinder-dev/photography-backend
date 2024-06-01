import mongoose from "mongoose";
const LayoutSchema = new mongoose.Schema({
    lightLogo: {
        type: String,
        required: true
    },
    darkLogo: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        required: true
    },
    servicesIntro: {
        type: String,
        required: true
    },
    footer: {
        type: String,
        required: true
    }
});

export const Layout = mongoose.model('layouts', LayoutSchema);