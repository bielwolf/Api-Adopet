import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";

export default class PetRepository implements InterfacePetRepository {
    private repository: Repository<PetEntity>;
    
    constructor(repository: Repository<PetEntity>) {
        this.repository = repository;
    }

    criaPet(pet: PetEntity): void {
        this.repository.save(pet);
    }
    async listarPets(): Promise<PetEntity[]> {
        return await this.repository.find();
    }
    
    async atualizaPet(id: number, newpet: PetEntity): Promise<{success: boolean; message?: string}> {
        try {
            const pet = await this.repository.findOne({where: {id}});
            if (!pet) {
                return { success: false, message: "Pet não encontrado" };
            }
            Object.assign(pet, newpet);
            await this.repository.save(pet);
            return { success: true };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Erro ao atualizar o pet"
            }
        }
    }
    async deletaPet(id: number): Promise<{success: boolean; message?: string}> {
        try {
            const pet = await this.repository.findOne({where: {id}});
            if (!pet) {
                return { success: false, message: "Pet não encontrado" };
            }
            await this.repository.remove(pet);
            return { success: true };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Erro ao deletar o pet"
            }
        }
    }

}