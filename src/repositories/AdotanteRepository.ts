import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "../repositories/interfaces/InterfaceAdotanteRepository";

export default class AdotanteRepository implements InterfaceAdotanteRepository {
    private repository: Repository<AdotanteEntity>;

    constructor(repository: Repository<AdotanteEntity>) {
        this.repository = repository;
    }

    async criaAdotante(adotante: AdotanteEntity): Promise<void> {
        await this.repository.save(adotante);
    }

    async listarAdotantes(): Promise<AdotanteEntity[]> {
            return await this.repository.find();
    }

    async atualizaAdotante(id: number, adotante: AdotanteEntity): Promise<{ success: boolean; message?: string; }> {
         try {
            const adotanteExistente = await this.repository.findOne({where: {id}});
            if (!adotanteExistente) {
                return { success: false, message: "Adotante não encontrado" };
            }
            Object.assign(adotanteExistente, adotante);
            await this.repository.save(adotanteExistente);
            return { success: true };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Erro ao atualizar o adotante"
            }
        }
    }
    async deletaAdotante(id: number): Promise<{ success: boolean; message?: string; }> {
        try {
            const adotanteExistente = await this.repository.findOne({where: {id}});
            if (!adotanteExistente) {
                return { success: false, message: "Adotante não encontrado" };
            }
            await this.repository.remove(adotanteExistente);
            return { success: true };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Erro ao deletar o adotante"
            }
        }
    }
}