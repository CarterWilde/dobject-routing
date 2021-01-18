import IMiddleware from "./IMiddleware";
import IRoute from "./IRoute";

export default interface IRouter {
    url?: string;
    middleware?: Array<IMiddleware>;
    routers?: Array<IRouter>;
    routes: Array<IRoute>;
}