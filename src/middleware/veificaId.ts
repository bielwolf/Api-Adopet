import { NextFunction, Request, Response } from "express";
import { RequestBad } from "../utils/manipulaErros";

export const veificaIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const params = {...req.params};

    for (const param in params) {
        if (!Number.isInteger(params[param])) {
            throw new RequestBad(`O parâmetro ${param} deve ser um número inteiro`);
        }
    }
}