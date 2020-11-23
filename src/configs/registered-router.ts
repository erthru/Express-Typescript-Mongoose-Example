import { Request, Response, Router } from "express";
import { ROOT_PATH, RouteDefinition, ROUTES } from "../decorators/router-decorator";
import ActivityRouter from "../routes/activity-router";
import SeedRouter from "../routes/seed-router";
import UserRouter from "../routes/user-router";

const router = Router();
const routes = [SeedRouter, UserRouter, ActivityRouter];

routes.map((_router) => {
    const rootPath = Reflect.getMetadata(ROOT_PATH, _router);
    const _routes: Array<RouteDefinition> = Reflect.getMetadata(ROUTES, _router);

    _routes.map((route) => {
        // @ts-ignore
        router[route.requestMethod](rootPath + route.path, (req: Request, res: Response) => new _router(req, res)[route.methodName]());
    });
});

export default router;
