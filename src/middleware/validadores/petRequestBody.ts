import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { TipoRequestBodyPet } from "../../tipos/tiposPet";
import {pt} from "yup-locale-pt";
import EnumEspecie from "../../enum/EnumEspecie";
import EnumPorte from "../../enum/EnumPorte";

yup.setLocale(pt)

const esquemaBodyPet:yup.ObjectSchema<Omit<TipoRequestBodyPet, "adotante">> = yup.object({
    nome: yup.string().required().defined(),
    especie: yup.string().oneOf(Object.values(EnumEspecie)).required().defined(),
    porte: yup.string().oneOf(Object.values(EnumPorte)).required().defined(),
    dataDeNascimento: yup.date().required().defined(),
    adotado: yup.boolean().required().defined(),
})

const middlewareValidadorBodyPet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await esquemaBodyPet.validate(req.body, {
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

export { middlewareValidadorBodyPet }