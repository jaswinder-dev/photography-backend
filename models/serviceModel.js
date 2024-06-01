import mongoose from "mongoose";
const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [3, "Service title must contain at least 3 characters!"],
        maxLength: [30, "Service title cannot have more than 30 characters!"],
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const Service = mongoose.model("services", ServiceSchema);