import express from "express";
import { createServer } from "http";
import db from "./configs/db";
import logger from "./configs/logger";
import { PORT } from "./helpers/environment";
import cors from "cors";
import userRouter from "./routes/user-router";
import activityRouter from "./routes/activity-router";
import seedRouter from "./routes/seed-router";

const app = express();
const server = createServer(app);

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static("public"));

app.use(seedRouter.path, seedRouter.router)
app.use(userRouter.path, userRouter.router)
app.use(activityRouter.path, activityRouter.router)

server.listen(PORT, async () => {
    await db();

    console.log("⚡️[DATABASE]: CONNECTED");
    console.log("⚡️[SERVER]: RUNNING");
    console.log("⚡️[PORT]: " + PORT);
    console.log("⚡️[MESSAGE]: エブリシングOK、頑張ってねー、エルトホルくん。ヽ(o＾▽＾o)ノ");
});
