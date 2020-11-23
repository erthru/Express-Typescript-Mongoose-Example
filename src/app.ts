import express from "express";
import { createServer } from "http";
import db from "./configs/db";
import logger from "./configs/logger";
import { PORT } from "./helpers/environment";
import ActivityRouter from "./routes/activity-router";
import IRouter from "./routes/router";
import SeedRouter from "./routes/seed-router";
import UserRouter from "./routes/user-router";
import cors from "cors";

const app = express();
const server = createServer(app);

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("public"));

const routes = [SeedRouter, UserRouter, ActivityRouter];

routes.map((Router) => {
    const router: IRouter = new Router();
    app.use(router.basePath, router.router);
});

server.listen(PORT, async () => {
    await db();

    console.log("⚡️[DATABASE]: CONNECTED");
    console.log("⚡️[SERVER]: RUNNING");
    console.log("⚡️[PORT]: " + PORT);
    console.log("⚡️[MESSAGE]: エブリシングOK、頑張ってねー、エルトホルくん。ヽ(o＾▽＾o)ノ");
});
