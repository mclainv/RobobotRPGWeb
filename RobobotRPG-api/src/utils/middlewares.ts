import { NextFunction, Request, Response } from "express";

export const isAuthenticated = (
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => {
        console.log("req.user is ", req.user);
        if(req.user) {
            next();
        }
        else {
            res.status(403).send({msg: "Unauthorized"});
        }
}