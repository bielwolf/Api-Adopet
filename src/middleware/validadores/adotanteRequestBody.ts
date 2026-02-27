import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";

const esquemaBodyAdotante:yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">> = yup.object({
    nome: yup.string().required().defined(),
    senha: yup.string().required().defined().min(6),
    celular: yup.string().required().defined(),
    foto: yup.string().optional()
})

const middlewareValidadorBodyAdotante = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await esquemaBodyAdotante.validate(req.body, {
            abortEarly: false,
        });
        return next();
    } catch (error) {
        const yupErrors = error as yup.ValidationError;

        const validationErrors: Record<string, string> = {};

        yupErrors.inner.forEach((error) => {
            if (!error.path) return;
            validationErrors[error.path] = error.message;
        })
        return res.status(400).json({ error: validationErrors });
    }
}

export { middlewareValidadorBodyAdotante }