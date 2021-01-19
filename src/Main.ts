import { Router } from "express";
import { IRoute } from "./IRoute";
import { IRouter } from "./IRouter";

const prop = (obj: any, key: any) => {
    return obj[key].bind(obj);
}

const buildRoutes = (router: Router, ...routes: Array<IRoute>): void => {
    routes.forEach(endpoint => {
        let url: string = endpoint.url || '/';
        console.log("Route created:" + url);
        prop(router, endpoint.method.toLowerCase())(url, endpoint.handlers);
        if (endpoint.routes) {
            endpoint.routes.forEach(route => {
                route.url = url + route.url;
            })
            buildRoutes(router, ...endpoint.routes);
        }
    });
}

const buildRouting = (...routers: Array<IRouter>): Router => {
    let mainRouter: Router = Router();

    routers.forEach(router => {
        let subRouter = Router();

        router.middleware?.forEach(middle => {
            subRouter.use(middle.handler);
        });
        router.routes = router.routes.map(route => {
            route.url = router.url || '/' + route.url;
            return route;
        })
        buildRoutes(subRouter, ...router.routes);

        if (router.routers) {
            subRouter.use(buildRouting(...router.routers));
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