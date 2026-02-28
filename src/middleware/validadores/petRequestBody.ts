import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { TipoRequestBodyPet } from "../../tipos/tiposPet";
import {pt} from "yup-locale-pt";
import EnumEspecie from "../../enum/EnumEspecie";
import EnumPorte from "../../enum/EnumPorte";
import tratarErroValidacaoYup from "../../utils/trataValidacaoYup";

yup.setLocale(pt)

const esquemaBodyPet:yup.ObjectSchema<Omit<TipoRequestBodyPet, "adotante" | "abrigo">> = yup.object({
    nome: yup.string().required().defined(),
    especie: yup.string().oneOf(Object.values(EnumEspecie)).required().defined(),
    porte: yup.string().oneOf(Object.values(EnumPorte)).required().defined(),
    dataDeNascimento: yup.date().required().defined(),
    adotado: yup.boolean().required().defined(),
})

const middlewareValidadorBodyPet = async (req: Request, res: Response, next: NextFunction) => {
    tratarErroValidacaoYup(esquemaBodyPet, req, res, next);

}

export { middlewareValidadorBodyPet }