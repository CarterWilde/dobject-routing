import { Router } from "express";
import IRoute from "./IRoute";
import IRouter from "./IRouter";

const buildRoutes = (router: Router, ...routes: Array<IRoute>) : void => {
    routes.forEach(endpoint => {
            eval(`router[endpoint.method.toLowerCase()](endpoint.url || '/', endpoint.handlers);`);
            if(endpoint.routes) {
                endpoint.routes.forEach(route => {
                    route.url = (endpoint.url || '/') + route.url;
                })
                buildRoutes(router, ...endpoint.routes);
            }
    });
}

export const buildRouting = (...routers: Array<IRouter>) : Router => {
    let router: Router = Router();

    routers.forEach(route => {
        let subRouter = Router();
        
        route.middleware?.forEach(middle => {
            eval(`subRouter.use(middle.handler);`);
        });

        buildRoutes(subRouter, ...route.routes);

        if(route.routers) {
            subRouter.use(buildRouting(...route.routers));
        }

        router.use(route.url || '/', subRouter);
    });

    return router;
}