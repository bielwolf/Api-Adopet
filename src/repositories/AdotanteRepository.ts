import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "../repositories/interfaces/InterfaceAdotanteRepository";

export default class AdotanteRepository implements InterfaceAdotanteRepository {
    private repository: Repository<AdotanteEntity>;
    
    constructor(repository: Repository<AdotanteEntity>) {
        this.repository = repository;
    }

      criaAdotante(adotante: AdotanteEntity): void {
        this.repository.save(adotante);
    }

    listarAdotantes(): AdotanteEntity[] | Promise<AdotanteEntity[]> {
        throw new Error("Method not implemented.");
    }
    atualizaAdotante(id: number, adotante: AdotanteEntity): Promise<{ success: boolean; message?: string; }> {
        throw new Error("Method not implemented.");
    }
    deletaAdotante(id: number): Promise<{ success: boolean; message?: string; }> | void {
        throw new Error("Method not implemented.");
    }
}