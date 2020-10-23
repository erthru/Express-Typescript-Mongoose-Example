import mongoose, { ConnectionOptions } from "mongoose";
import { DB_URL } from "../helpers/constants";

export default async () => {
    const options: ConnectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    };

    return await mongoose.connect(DB_URL, options);
};
