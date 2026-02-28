import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import EnderecoEntity from "../../entities/EnderecoEntity";
import {pt} from "yup-locale-pt";
import tratarErroValidacaoYup from "../../utils/trataValidacaoYup";

yup.setLocale(pt)

const esquemaBodyEndereco:yup.ObjectSchema<Omit<EnderecoEntity, "id">> = 
    yup.object({
        cidade: yup.string().required().defined(),
        estado: yup.string().required().defined()
    })

const middlewareValidadorBodyEndereco = async (req: Request, res: Response, next: NextFunction) => {
    tratarErroValidacaoYup(esquemaBodyEndereco, req, res, next);
}

export { middlewareValidadorBodyEndereco }