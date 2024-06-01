import jwt from "jsonwebtoken";
import mongoose, { Mongoose } from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';

const photographerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minLength: [5, "First name should be altest 5 character long!"],
        maxLength: [16, "First name cannot have more than 16 characters!"],
        required: true
    },
    avatar: {
        type: String,
        default: "http://localhost:5555/default.png"
    },
    username: {
        type: String,
        minLength: [8, "First name should be altest 8 character long!"],
        maxLength: [20, "First name cannot have more than 20 characters!"],
        required: true
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide valid email!"],
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minLength: [8, "Password must be 8 character long!"],
        maxLength: [16, "Password cannot have more than 16 characters!"],
        required: true,
        selected: false
    },
    role: {
        type: String,
        required: true,
        enum: ['Normal', 'Admin'],
        default: 'Normal'
    },
    posts: {
        type: Number,
        default: 0,
        required: true
    }
}, {
    timestamps: true
});

photographerSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(5);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        return next();
    }
});

photographerSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

photographerSchema.methods.getJWTToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES }
    );
};

export const Photographer = mongoose.model('photographers', photographerSchema);