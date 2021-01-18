import { NextFunction, Request, Response } from "express";

export interface IMiddleware {
    handler: (req: Request, res: Response, next: NextFunction) => void;
}