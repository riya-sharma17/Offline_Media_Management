import { Router } from "express";
import videoRoutes from "./videos/video.route";


const router = Router();
router.use("/videos", videoRoutes);


export default router;
