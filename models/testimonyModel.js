import mongoose from "mongoose";
import validator from "validator";
const TestimonySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photographer: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    image: {
        type: String,
        default: "default.png"
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide valid email!"],
        required: true
    },
    phone: {
        type: String
    },
    testimony: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Testimony = mongoose.model("testimonies", TestimonySchema);