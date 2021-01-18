import { NextFunction, Request, Response } from "express";
import { ERequestType } from "./ERequestType";

export interface IRoute {
    url?: string;
    method: ERequestType | string;
    handlers: Array<(req: Request, res: Response, next: NextFunction) => void>;
    routes?: Array<IRoute>;
}