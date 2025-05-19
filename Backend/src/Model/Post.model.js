import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    title: {
        type: String,
    },

    description: {
        type: String,
    },

    city: {
        type: String,
        required: true,
    },

    latitude: {
        type: Number,
        required: true,
    },

    longitude: {
        type: Number,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    type: {
        type: String,
        enum: ["Rent", "Buy"],
        required: true,
    },

    bedRooms: {
        type: Number,
        required: true,
    },

    bathRooms: {
        type: Number,
        required: true,
    },

    images: [
        {
            type: String,
        }
    ],
}, { timestamps: true });

const postModel = mongoose.model("Post", postSchema);

export default postModel;