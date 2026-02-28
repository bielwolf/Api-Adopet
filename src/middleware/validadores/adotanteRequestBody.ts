import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";
import {pt} from "yup-locale-pt";
import tratarErroValidacaoYup from "../../utils/trataValidacaoYup";

yup.setLocale(pt)

const esquemaBodyAdotante:yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">> = yup.object({
    nome: yup.string().required().defined(),
    senha: yup
    .string()
    .required()
    .defined()
    .min(6)
    .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm, "A senha deve conter entre 8 e 16 caracteres, pelo menos um dígito, uma letra maiúscula, uma letra minúscula e um caractere especial"),
    celular: yup
    .string()
    .required()
    .defined()
    .matches(/^\(?([0-9]{2})\)? ?([0-9]{4,5})-?([0-9]{4})$/gm, "Número de celular inválido"),
    foto: yup.string().optional()
})

const middlewareValidadorBodyAdotante = async (req: Request, res: Response, next: NextFunction) => {
    tratarErroValidacaoYup(esquemaBodyAdotante, req, res, next);
}

export { middlewareValidadorBodyAdotante }