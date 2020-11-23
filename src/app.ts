import express from "express";
import { createServer, Server } from "http";
import { PORT } from "./helpers/environment";
import cors from "cors";
import db from "./configs/db";
import logger from "./configs/logger";
import registeredRouter from "./configs/registered-router";

const app = express();
const server: Server = createServer(app);

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());
app.use(registeredRouter);

server.listen(PORT, async () => {
    await db();

    console.log("⚡️[DATABASE]: CONNECTED");
    console.log("⚡️[SERVER]: RUNNING");
    console.log("⚡️[PORT]: " + PORT);
    console.log("⚡️[MESSAGE]: エブリシングOK、頑張ってねー、エルトホルくん。ヽ(o＾▽＾o)ノ");
});
