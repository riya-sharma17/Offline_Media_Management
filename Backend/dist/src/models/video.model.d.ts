import mongoose from "mongoose";
import { IVideo } from "../interfaces/video.interface";
declare const videoModel: mongoose.Model<IVideo, {}, {}, {}, mongoose.Document<unknown, {}, IVideo, {}, mongoose.DefaultSchemaOptions> & IVideo & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IVideo>;
export default videoModel;
//# sourceMappingURL=video.model.d.ts.map