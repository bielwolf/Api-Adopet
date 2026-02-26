import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";

export default class PetRepository implements InterfacePetRepository {
    private petRepository: Repository<PetEntity>;
    private adotanteRepository: Repository<AdotanteEntity>;
    
    constructor(petRepository: Repository<PetEntity>, adotanteRepository: Repository<AdotanteEntity>) {
        this.petRepository = petRepository;
        this.adotanteRepository = adotanteRepository;
    }

    criaPet(pet: PetEntity): void {
        this.petRepository.save(pet);
    }
    async listarPets(): Promise<PetEntity[]> {
        return await this.petRepository.find();
    }
    
    async atualizaPet(id: number, newpet: PetEntity): Promise<{success: boolean; message?: string}> {
        try {
            const pet = await this.petRepository.findOne({where: {id}});
            if (!pet) {
                return { success: false, message: "Pet não encontrado" };
            }
            Object.assign(pet, newpet);
            await this.petRepository.save(pet);
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
            const pet = await this.petRepository.findOne({where: {id}});
            if (!pet) {
                return { success: false, message: "Pet não encontrado" };
            }
            await this.petRepository.remove(pet);
            return { success: true };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Erro ao deletar o pet"
            }
        }
    }

    async adotaPet(idPet: number, idAdotante: number): Promise<{ success: boolean; message?: string }> {
        try {
            const pet = await this.petRepository.findOne({ where: { id: idPet }});
            if (!pet) {
                return { success: false, message: "Pet não encontrado" };
            }

            const adotante = await this.adotanteRepository.findOne({ where: { id: idAdotante }});
            if (!adotante) {
                return { success: false, message: "Adotante não encontrado" };
            }
            pet.adotante = adotante;
            pet.adotado = true;
            await this.petRepository.save(pet);
            return { success: true };
        
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Erro ao adotar o pet"
            }
        }
    }
}