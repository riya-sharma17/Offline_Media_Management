import { Request, Response, NextFunction } from "express";
import videoModel from "../models/video.model";
import { SUCCESS_RESPONSE, ERROR_RESPONSE } from "../utils/message";

export const uploadVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: ERROR_RESPONSE.BAD_REQUEST,
      });
    }

    const video = await videoModel.create({
      name: file.filename,
      path: `/uploads/videos/${file.filename}`,
      size: file.size,
    });

    return res.status(201).json({
      message: SUCCESS_RESPONSE.VIDEO_UPLOADED,
      data: video,
    });
  } catch (error) {
    next(error);
  }
};

export const listVideos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { page = 1, limit = 10 } = req.query as any;

    page = Number(page);
    limit = Number(limit);

    const total = await videoModel.countDocuments();

    const videos = await videoModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ uploadedAt: -1 })
      .lean();

    return res.status(200).json({
      message: SUCCESS_RESPONSE.VIDEOS_FETCHED,
      data: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        videos,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const video = await videoModel.findById(id);

    if (!video) {
      return res.status(404).json({
        message: ERROR_RESPONSE.VIDEO_NOT_FOUND,
      });
    }

    await videoModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: SUCCESS_RESPONSE.VIDEO_DELETED,
    });
  } catch (error) {
    next(error);
  }
};
