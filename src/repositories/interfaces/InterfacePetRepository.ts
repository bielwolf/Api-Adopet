import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/EnumPorte";

export default interface InterfacePetRepository {
    criaPet(pet:PetEntity): void;
    listarPets(): PetEntity[] | Promise<PetEntity[]>;
    atualizaPet(id:number, pet:PetEntity): Promise<{success: boolean; message?: string}>;
    deletaPet(id:number): Promise<{success: boolean; message?: string}> | void;
    buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(campo: Tipo, valor: PetEntity[Tipo]): Promise<PetEntity[]> | PetEntity[];
}