import mongoose, { Document, Schema } from "mongoose";

export enum UserDocument {
    schemaName = "user",
    firstName = "firstName",
    lastName = "lastName",
    email = "email",
}

interface IUser extends Document {
    [UserDocument.firstName]?: string;
    [UserDocument.lastName]?: string;
    [UserDocument.email]?: string;
}

const schema = new Schema(
    {
        [UserDocument.firstName]: {
            type: String,
            required: true,
        },

        [UserDocument.lastName]: {
            type: String,
        },

        [UserDocument.email]: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IUser>(UserDocument.schemaName, schema);
