import PetEntity from "../../entities/PetEntity";

export default interface InterfacePetRepository {
    criaPet(pet:PetEntity): void;
    listarPets(): PetEntity[] | Promise<PetEntity[]>;
    atualizaPet(id:number, pet:PetEntity): void;
    deletaPet(id:number): void;
}