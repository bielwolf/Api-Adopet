import { Request, Response } from "express";
import AdotanteEntity from "../entities/AdotanteEntity";
import AdotanteRepository from "../repositories/AdotanteRepository";


export default class AdotanteController {
    constructor(private repository: AdotanteRepository) { }

    async criaAdotante(req: Request, res: Response) {
        const adotante = <AdotanteEntity>req.body;
        await this.repository.criaAdotante(adotante);
        return res.status(201).json(adotante);
    }
}