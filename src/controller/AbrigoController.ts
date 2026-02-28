import { Request, Response } from "express";
import AbrigoEntity from "../entities/AbrigoEntity";
import AbrigoRepository from "../repositories/AbrigoRepository";
import EnderecoEntity from "../entities/EnderecoEntity";
import { TipoRequestBodyAbrigo, TipoRequestParamsAbrigo, TipoResponseBodyAbrigo } from "../tipos/tiposAbrigo";

export default class AbrigoController {
    constructor(private repository: AbrigoRepository) { }

    async criaAbrigo(
        req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
        res: Response<TipoResponseBodyAbrigo>
    ) {

        const { nome, senha, email, celular, endereco } = <AbrigoEntity>req.body;

        let bodyValited: TipoRequestBodyAbrigo;

        const novoAbrigo = new AbrigoEntity(nome, senha, email, celular, endereco);

        await this.repository.criaAbrigo(novoAbrigo);
        return res.status(201).json({ dados: { id: novoAbrigo.id, nome, celular, email, endereco } });
    }

    async listarAbrigos(
        req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
        res: Response<TipoResponseBodyAbrigo>
    ) {
        const listaDeAbrigos = await this.repository.listarAbrigos();
        const dados = listaDeAbrigos.map((abrigo) =>  { 
            return {
                id: abrigo.id, 
                nome: abrigo.nome,
                email: abrigo.email, 
                celular: abrigo.celular , 
                endereco: abrigo.endereco !== null ? abrigo.endereco : undefined
            }});
        return res.status(200).json({dados});
    }

    async atualizaAbrigo(
        req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
        res: Response<TipoResponseBodyAbrigo>) {
        const { id } = req.params;
        await this.repository.atualizaAbrigo(Number(id), req.body as AbrigoEntity);

        return res.sendStatus(204);
    }

    async deletaAbrigo(
        req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
        res: Response<TipoResponseBodyAbrigo>) {
        const { id } = req.params;
        await this.repository.deletaAbrigo(Number(id));
        
        return res.sendStatus(204);
    }

    async atualizaEnderecoAbrigo(
        req: Request<TipoRequestParamsAbrigo, {}, EnderecoEntity>,
        res: Response<TipoResponseBodyAbrigo>) {
        const { id } = req.params;
        await this.repository.atualizaEnderecoAbrigo(Number(id), req.body);
        
        return res.sendStatus(204);
    }
}