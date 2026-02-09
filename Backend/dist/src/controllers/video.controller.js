"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideo = exports.listVideos = exports.uploadVideo = void 0;
const video_model_1 = __importDefault(require("../models/video.model"));
const message_1 = require("../utils/message");
const uploadVideo = async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: message_1.ERROR_RESPONSE.BAD_REQUEST,
            });
        }
        const video = await video_model_1.default.create({
            name: file.filename,
            path: `/uploads/videos/${file.filename}`,
            size: file.size,
        });
        return res.status(201).json({
            message: message_1.SUCCESS_RESPONSE.VIDEO_UPLOADED,
            data: video,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.uploadVideo = uploadVideo;
const listVideos = async (req, res, next) => {
    try {
        let { page = 1, limit = 10 } = req.query;
        page = Number(page);
        limit = Number(limit);
        const total = await video_model_1.default.countDocuments();
        const videos = await video_model_1.default
            .find()
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ uploadedAt: -1 })
            .lean();
        return res.status(200).json({
            message: message_1.SUCCESS_RESPONSE.VIDEOS_FETCHED,
            data: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                videos,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.listVideos = listVideos;
const deleteVideo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const video = await video_model_1.default.findById(id);
        if (!video) {
            return res.status(404).json({
                message: message_1.ERROR_RESPONSE.VIDEO_NOT_FOUND,
            });
        }
        await video_model_1.default.findByIdAndDelete(id);
        return res.status(200).json({
            message: message_1.SUCCESS_RESPONSE.VIDEO_DELETED,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteVideo = deleteVideo;
//# sourceMappingURL=video.controller.js.map