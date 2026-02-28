import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import { NotFound } from "../utils/manipulaErros";

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
    
    async atualizaPet(id: number, newpet: PetEntity) {
            const petUpdate = await this.petRepository.findOne({where: {id}});

            if (!petUpdate) {
                throw new NotFound("Pet não encontrado");
            }
            Object.assign(petUpdate, newpet);
            await this.petRepository.save(petUpdate); 
            return { success: true };

    }
    async deletaPet(id: number) {
            const pet = await this.petRepository.findOne({where: {id}});

            if (!pet) {
                throw new NotFound("Pet não encontrado");
            }

            await this.petRepository.remove(pet);
            return { success: true };
    }

    async adotaPet(idPet: number, idAdotante: number){
            const pet = await this.petRepository.findOne({ where: { id: idPet }});
            if (!pet) {
                throw new NotFound("Pet não encontrado");
            }

            const adotante = await this.adotanteRepository.findOne({ where: { id: idAdotante }});
            if (!adotante) {
                throw new NotFound("Adotante não encontrado");
            }
            pet.adotante = adotante;
            pet.adotado = true;
            await this.petRepository.save(pet);
            return { success: true };
        
    }

    async buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(campo: Tipo, valor: PetEntity[Tipo]): Promise<PetEntity[]> {
        const pets = await this.petRepository.find({ where: { [campo]: valor }});
        return pets;
    }
}