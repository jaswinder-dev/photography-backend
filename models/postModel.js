import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    photographer: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    photographer_name: {
        type: String,
        required: true,
    },
    portfolio: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    description: {
        type: String,
        maxLength: [100, "Description cannot have more than 100 characters!"]
    }
}, {
    timestamps: true
});

export const Post = mongoose.model('posts', postSchema);