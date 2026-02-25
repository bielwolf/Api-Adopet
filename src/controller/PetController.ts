import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";

let listaDePets: TipoPet[] = [];

let id = 0;
function geraId() {
  id += 1;
  return id;
}

export default class PetController {
    criaPet(req:Request, res:Response) {
        const { nome, especie, dataDeNascimento, adotado } = <TipoPet>req.body;
        if(Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({ message: "Espécie inválida" });
        }
        const novoPet: TipoPet = {
            id: geraId(),
            nome,
            especie,
            dataDeNascimento,
            adotado
        }
        listaDePets.push(novoPet);
        return res.status(201).json(novoPet);
    }

    listarPets(req:Request, res:Response) {
        return res.status(200).json(listaDePets);
    }

    atualizaPet(req:Request, res:Response) {
        const { id } = req.params;
        const { nome, especie, dataDeNascimento, adotado } = <TipoPet>req.body;
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