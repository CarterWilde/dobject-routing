import {IMiddleware} from "./IMiddleware";
import {IRoute} from "./IRoute";

export interface IRouter {
    url?: string;
    middleware?: Array<IMiddleware>;
    routers?: Array<IRouter>;
    routes: Array<IRoute>;
}