import { Types } from "mongoose";
export interface IVideo {
    _id?: Types.ObjectId;
    name: string;
    path: string;
    size?: number;
    uploadedAt?: Date;
}
//# sourceMappingURL=video.interface.d.ts.map