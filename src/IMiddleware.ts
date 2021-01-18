import { NextFunction, Request, Response } from "express";

export default interface IMiddleware {
    handler: (req: Request, res: Response, next: NextFunction) => void;
}