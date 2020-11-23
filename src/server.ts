import express from "express";
import { PORT } from "./helpers/environment";
import cors from "cors";
import logger from "./configs/logger";
import App from "./app";
import UserRouter from "./routes/user-router";
import SeedRouter from "./routes/seed-router";
import ActivityRouter from "./routes/activity-router";

const app = new App(
    PORT,
    express(),
    [SeedRouter, UserRouter, ActivityRouter],
    [logger, express.json(), express.urlencoded({ extended: false }), cors()],
    express.static("public")
);

app.listen();
