import { Request, Response } from "express";
import AdotanteEntity from "../entities/AdotanteEntity";
import AdotanteRepository from "../repositories/AdotanteRepository";
import EnderecoEntity from "../entities/EnderecoEntity";


export default class AdotanteController {
    constructor(private repository: AdotanteRepository) { }

    async criaAdotante(req: Request, res: Response) {
        const { nome, senha, celular, foto, endereco } = <AdotanteEntity>req.body;
        const novoAdotante = new AdotanteEntity(nome, senha, celular, foto, endereco);
        await this.repository.criaAdotante(novoAdotante);
        return res.status(201).json(novoAdotante);    
    }

       async listarAdotantes(req: Request, res: Response) {
            const listaDeAdotantes = await this.repository.listarAdotantes();
            return res.status(200).json(listaDeAdotantes);
        }
    
        async atualizaAdotante(req: Request, res: Response) {
            const { id } = req.params;
            const { success, message } = await this.repository.atualizaAdotante(Number(id), req.body as AdotanteEntity);
    
            if (!success) {
                return res.status(404).json({ message });
            }
            return res.sendStatus(204);
        }
    
        async deletaAdotante(req: Request, res: Response) {
            const { id } = req.params;
            const { success, message } = await this.repository.deletaAdotante(Number(id));
            if (!success) {
                return res.status(404).json({ message });
            }
            return res.status(204).json({ message });
        }

        async atualizaEnderecoAdotante(req: Request, res: Response) {
            const { id } = req.params;
            const { success, message } = await this.repository.atualizaEnderecoAdotante(Number(id), req.body as EnderecoEntity);
            if (!success) {
                return res.status(404).json({ message });
            }
            return res.sendStatus(204);
        }
}