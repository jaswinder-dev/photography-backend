import mongoose from "mongoose";
const PortfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    posts: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

export const Portfolio = mongoose.model('portfolios', PortfolioSchema);