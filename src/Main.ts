import { Router } from "express";
import { IRoute } from "./IRoute";
import { IRouter } from "./IRouter";

const prop = (obj: any, key: any) => {
    return obj[key].bind(obj);
}

const buildRoutes = (router: Router, ...routes: Array<IRoute>): void => {
    routes.forEach(endpoint => {
        prop(router, endpoint.method.toLowerCase())(endpoint.url || '/', endpoint.handlers);
        if (endpoint.routes) {
            endpoint.routes.forEach(route => {
                route.url = (endpoint.url ? endpoint.url : '') + (route.url || '/');
            })
            buildRoutes(router, ...endpoint.routes);
        }
    });
}

const buildRouting = (routers: Array<IRouter>, parentUrl?:string): Router => {
    let mainRouter: Router = Router();

    routers.forEach(router => {
        let subRouter = Router();

        router.middleware?.forEach(middle => {
            subRouter.use(middle.handler);
        });
        buildRoutes(subRouter, ...router.routes);

        if (router.routers) {
            console.log("Router Created:" + (parentUrl || '') + (router.url || '/'));
            subRouter.use(buildRouting(router.routers, router.url));
        }

        mainRouter.use(router.url || '/', subRouter);
    });

    return mainRouter;
}

export * from "./ERequestType";
export * from "./IMiddleware";
export * from "./IRoute";
export * from "./IRouter";

export default buildRouting;