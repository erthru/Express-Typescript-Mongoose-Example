import * as dotEnv from "dotenv";

dotEnv.config();

export const PORT = (process.env.PORT as unknown) as number;
export const DB_URL = (process.env.DB_URL as unknown) as string;
