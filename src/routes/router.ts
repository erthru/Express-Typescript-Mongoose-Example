import { Router } from "express";

export default interface IRouter {
    router: Router;
    basePath: string;
    initRouter(): void;
}
