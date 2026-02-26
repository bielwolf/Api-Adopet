import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

let listaDePets: TipoPet[] = [];

let id = 0;
function geraId() {
    id += 1;
    return id;
}

export default class PetController {
    constructor(private repository: PetRepository) { }

    async criaPet(req: Request, res: Response) {
        const { nome, especie, dataDeNascimento, adotado } = <PetEntity>req.body;
        if (!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({ message: "Espécie inválida" });
        }
        const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado);
        await this.repository.criaPet(novoPet);
        return res.status(201).json(novoPet);
    }

    async listarPets(req: Request, res: Response) {
        const listaDePets = await this.repository.listarPets();
        return res.status(200).json(listaDePets);
    }

    async atualizaPet(req: Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaPet(Number(id), req.body as PetEntity);

        if (!success) {
            return res.status(404).json({ message });
        }
        return res.sendStatus(204);
    }

    async deletaPet(req: Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.deletaPet(Number(id));
        if (!success) {
            return res.status(404).json({ message });
        }
        return res.status(204).json({ message });
    }
    async adotaPet(req: Request, res: Response) {
        const { pet_id, adotante_id } = req.params;
        const { success, message } = await this.repository.adotaPet(Number(pet_id), Number(adotante_id));
        if (!success) {
            return res.status(404).json({ message });
        }
        return res.status(200).json({ message: "Pet adotado com sucesso" });
    }
}