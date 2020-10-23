import mongoose, { Document, Schema } from "mongoose";
import { UserDocument } from "./user-schema";

export enum ActivityDocument {
    schemaName = "activity",
    name = "name",
    userId = "userId",
}

interface IActivity extends Document {
    [ActivityDocument.name]?: string;
    [ActivityDocument.userId]?: mongoose.Schema.Types.ObjectId;
}

const schema = new Schema(
    {
        [ActivityDocument.name]: {
            type: String,
            required: true,
        },

        [ActivityDocument.userId]: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

schema.virtual(UserDocument.schemaName, {
    ref: UserDocument.schemaName,
    localField: ActivityDocument.userId,
    foreignField: "_id",
    justOne: true,
});

schema.set("toJSON", {
    transform: (_: any, ret: any, __: any) => {
        delete ret.id;
        delete ret[ActivityDocument.userId];

        return ret;
    },

    virtuals: true,
});

export default mongoose.model<IActivity>(ActivityDocument.schemaName, schema);
