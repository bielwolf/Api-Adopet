import { Request, Response } from "express";
import AdotanteEntity from "../entities/AdotanteEntity";
import AdotanteRepository from "../repositories/AdotanteRepository";
import EnderecoEntity from "../entities/EnderecoEntity";
import { TipoRequestBodyAdotante, TipoRequestParamsAdotante, TipoResponseBodyAdotante } from "../tipos/tiposAdotante";

export default class AdotanteController {
    constructor(private repository: AdotanteRepository) { }

    async criaAdotante(
        req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
        res: Response<TipoResponseBodyAdotante>
    ) {

        const { nome, senha, celular, foto, endereco } = <AdotanteEntity>req.body;

        let bodyValited: TipoRequestBodyAdotante;

        const novoAdotante = new AdotanteEntity(nome, senha, celular, foto, endereco);

        await this.repository.criaAdotante(novoAdotante);
        return res.status(201).json({ dados: { id: novoAdotante.id, nome, celular, endereco } });
    }

    async listarAdotantes(
        req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
        res: Response<TipoResponseBodyAdotante>
    ) {
        const listaDeAdotantes = await this.repository.listarAdotantes();
        const dados = listaDeAdotantes.map((adotante) =>  { 
            return {
                id: adotante.id, 
                nome: adotante.nome, 
                celular: adotante.celular , 
                endereco: adotante.endereco !== null ? adotante.endereco : undefined
            }});
        return res.status(200).json({dados});
    }

    async atualizaAdotante(
        req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
        res: Response<TipoResponseBodyAdotante>) {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaAdotante(Number(id), req.body as AdotanteEntity);

        if (!success) {
            return res.status(404).json({ erros: message });
        }
        return res.sendStatus(204);
    }

    async deletaAdotante(
        req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
        res: Response<TipoResponseBodyAdotante>) {
        const { id } = req.params;
        const { success, message } = await this.repository.deletaAdotante(Number(id));
        if (!success) {
            return res.status(404).json({ erros: message });
        }
        return res.sendStatus(204);
    }

    async atualizaEnderecoAdotante(
        req: Request<TipoRequestParamsAdotante, {}, EnderecoEntity>,
        res: Response<TipoResponseBodyAdotante>) {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaEnderecoAdotante(Number(id), req.body);
        if (!success) {
            return res.status(404).json({ erros: message });
        }
        return res.sendStatus(204);
    }
}