import { Router } from "express";
import {
  uploadVideo,
  listVideos,
  deleteVideo,
} from "../../controllers/video.controller";
import upload from "../../utils/multer";
import { validateQuery } from "../../validations/validation";
import { listVideosValidation } from "../../validations/video.validation";

const router = Router();

// Upload video
router.post(
  "/upload",
  upload.single("video"),
  uploadVideo
);

// List videos
router.get(
  "/",
  validateQuery(listVideosValidation),
  listVideos
);

// Delete video
router.delete(
  "/:id",
  deleteVideo
);

export default router;
