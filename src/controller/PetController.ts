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
    constructor(private repository: PetRepository) {}

    criaPet(req:Request, res:Response) {
        const { nome, especie, dataDeNascimento, adotado } = <PetEntity>req.body;
        if(!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({ message: "Espécie inválida" });
        }
        const novoPet = new PetEntity();
            novoPet.id = geraId();
            novoPet.nome = nome;
            novoPet.especie = especie;
            novoPet.dataDeNascimento = dataDeNascimento;
            novoPet.adotado = adotado;

        this.repository.criaPet(novoPet);
        return res.status(201).json(novoPet);
    }

    async listarPets(req:Request, res:Response) {
        const listaDePets = await this.repository.listarPets();
        return res.status(200).json(listaDePets);
    }

    atualizaPet(req:Request, res:Response) {
        const { id } = req.params;
        const { nome, especie, dataDeNascimento, adotado } = <PetEntity>req.body;
        const pet = listaDePets.find((p) => p.id === Number(id));
        if (!pet) {
            return res.status(404).json({ message: "Pet não encontrado" });
        }
        pet.nome = nome;
        pet.especie = especie;
        pet.dataDeNascimento = dataDeNascimento;
        pet.adotado = adotado;
        return res.status(200).json(pet);
    }

    deletaPet(req:Request, res:Response) {
        const { id } = req.params;
        const pet = listaDePets.find((p) => p.id === Number(id));
        if (!pet) {
            return res.status(404).json({ message: "Pet não encontrado" });
        }
        const index = listaDePets.indexOf(pet);
        listaDePets.splice(index, 1);
        return res.status(204).json({ message: "Pet deletado com sucesso" });
    }
}