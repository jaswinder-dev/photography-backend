import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [10, "Title should contain at least 10 characters!"],
        maxLength: [80, "Title should not have more than 80 characters!"],
        required: true
    },
    author: {
        type: String,
        required: true
    },
    author_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    description: {
        type: String,
        minLength: [200, "Title should contain at least 200 characters!"],
        required: true
    },
    image: {
        type: String,
        default: "default.png",
        required: true
    }
}, { timestamps: true });

export const Blog = mongoose.model("blogs", BlogSchema);