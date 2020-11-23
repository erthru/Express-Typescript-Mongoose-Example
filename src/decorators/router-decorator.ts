import "reflect-metadata";

export const ROOT_PATH = "ROOT_PATH";
export const ROUTES = "ROUTES";

export type RouteDefinition = {
    requestMethod: "get" | "post" | "put" | "delete" | "options";
    path: string;
    methodName: string;
};

export const RouterRoot = (rootPath: string) => {
    return (target: Function) => {
        Reflect.defineMetadata(ROOT_PATH, rootPath.length === 1 && rootPath === "/" ? "" : rootPath, target);
        if (!Reflect.hasMetadata(ROUTES, target)) Reflect.defineMetadata(ROUTES, [], target);
    };
};

export const RouterGet = (childPath: string) => {
    return (target: Object, propertyKey: string) => {
        if (!Reflect.hasMetadata(ROUTES, target.constructor)) Reflect.defineMetadata(ROUTES, [], target.constructor);
        const routes = Reflect.getMetadata(ROUTES, target.constructor) as Array<RouteDefinition>;

        routes.push({
            requestMethod: "get",
            path: childPath,
            methodName: propertyKey,
        });

        Reflect.defineMetadata(ROUTES, routes, target.constructor);
    };
};

export const RouterPost = (childPath: string) => {
    return (target: Object, propertyKey: string) => {
        if (!Reflect.hasMetadata(ROUTES, target.constructor)) Reflect.defineMetadata(ROUTES, [], target.constructor);
        const routes = Reflect.getMetadata(ROUTES, target.constructor) as Array<RouteDefinition>;

        routes.push({
            requestMethod: "post",
            path: childPath,
            methodName: propertyKey,
        });

        Reflect.defineMetadata(ROUTES, routes, target.constructor);
    };
};

export const RouterPut = (childPath: string) => {
    return (target: Object, propertyKey: string) => {
        if (!Reflect.hasMetadata(ROUTES, target.constructor)) Reflect.defineMetadata(ROUTES, [], target.constructor);
        const routes = Reflect.getMetadata(ROUTES, target.constructor) as Array<RouteDefinition>;

        routes.push({
            requestMethod: "put",
            path: childPath,
            methodName: propertyKey,
        });

        Reflect.defineMetadata(ROUTES, routes, target.constructor);
    };
};

export const RouterDelete = (childPath: string) => {
    return (target: Object, propertyKey: string) => {
        if (!Reflect.hasMetadata(ROUTES, target.constructor)) Reflect.defineMetadata(ROUTES, [], target.constructor);
        const routes = Reflect.getMetadata(ROUTES, target.constructor) as Array<RouteDefinition>;

        routes.push({
            requestMethod: "delete",
            path: childPath,
            methodName: propertyKey,
        });

        Reflect.defineMetadata(ROUTES, routes, target.constructor);
    };
};
