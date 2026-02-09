import mongoose, { Schema } from "mongoose";
import { IVideo } from "../interfaces/video.interface";

const VideoSchema = new Schema<IVideo>(
    {
        name: {
            type: String,
            required: true,
        },

        path: {
            type: String,
            required: true,
        },

        size: {
            type: Number,
        },

        uploadedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: "videos",
        versionKey: false,
    }
);

const videoModel = mongoose.model<IVideo>("videos", VideoSchema);
export default videoModel;
