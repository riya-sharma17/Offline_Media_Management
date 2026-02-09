"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const video_controller_1 = require("../../controllers/video.controller");
const multer_1 = __importDefault(require("../../utils/multer"));
const validation_1 = require("../../validations/validation");
const video_validation_1 = require("../../validations/video.validation");
const router = (0, express_1.Router)();
// Upload video
router.post("/upload", multer_1.default.single("video"), video_controller_1.uploadVideo);
// List videos
router.get("/", (0, validation_1.validateQuery)(video_validation_1.listVideosValidation), video_controller_1.listVideos);
// Delete video
router.delete("/:id", video_controller_1.deleteVideo);
exports.default = router;
//# sourceMappingURL=video.route.js.map