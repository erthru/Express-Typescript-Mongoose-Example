import { Express } from "express";
import { createServer } from "http";
import db from "./configs/db";
import IRouter from "./routes/router";

export default class App {
    private port!: number;
    private express!: Express;

    constructor(port: number, express: Express, routes: Array<any> = [], middlewares: Array<any> = [], pub: any) {
        this.port = port;
        this.express = express;
        this.registerRouter(routes);
        this.registerMiddleware(middlewares);
        this.registerPub(pub);
    }

    private registerRouter(routes: Array<any>) {
        routes.map((Router) => {
            const router: IRouter = new Router();
            this.express.use(router.basePath, router.router);
        });
    }

    private registerMiddleware(middlewares: Array<any>) {
        middlewares.map((middleware) => {
            this.express.use(middleware);
        });
    }

    private registerPub(pub: any) {
        this.express.use(pub);
    }

    listen() {
        createServer(this.express).listen(this.port, async () => {
            await db();

            console.log("⚡️[DATABASE]: CONNECTED");
            console.log("⚡️[SERVER]: RUNNING");
            console.log("⚡️[PORT]: " + this.port);
            console.log("⚡️[MESSAGE]: エブリシングOK、頑張ってねー、エルトホルくん。ヽ(o＾▽＾o)ノ");
        });
    }
}
