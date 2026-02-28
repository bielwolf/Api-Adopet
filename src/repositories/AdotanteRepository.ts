import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "../repositories/interfaces/InterfaceAdotanteRepository";
import EnderecoEntity from "../entities/EnderecoEntity";
import { NotFound, RequestBad } from "../utils/manipulaErros";

export default class AdotanteRepository implements InterfaceAdotanteRepository {
    private repository: Repository<AdotanteEntity>;
    private async verificaCelularAdotante(celular: string) {
        return await this.repository.findOne({ where: { celular } });
    }

    constructor(repository: Repository<AdotanteEntity>) {
        this.repository = repository;
    }

    async criaAdotante(adotante: AdotanteEntity): Promise<void> {
        if (await this.verificaCelularAdotante(adotante.celular)) {
            throw new RequestBad("Celular já cadastrado");
        }
        await this.repository.save(adotante);
    }

    async listarAdotantes(): Promise<AdotanteEntity[]> {
        return await this.repository.find();
    }

    async atualizaAdotante(id: number, adotante: AdotanteEntity) {
        const adotanteToUpdate = await this.repository.findOne({ where: { id } });

        if (!adotanteToUpdate) {
            throw new NotFound("Adotante não encontrado");
        }

        Object.assign(adotanteToUpdate, adotante);

        await this.repository.save(adotanteToUpdate);

        return { success: true };
    }
    async deletaAdotante(id: number) {
        const adotanteToDelete = await this.repository.findOne({ where: { id } });
        
        if (!adotanteToDelete) {
            throw new NotFound("Adotante não encontrado");
        }

        await this.repository.remove(adotanteToDelete);

        return { success: true };

    }
    async atualizaEnderecoAdotante(idAdotante: number, endereco: EnderecoEntity) {
        const adotante = await this.repository.findOne({ where: { id: idAdotante }});

        if (!adotante) {
            throw new NotFound("Adotante não encontrado");
        }

        const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
        adotante.endereco = novoEndereco;

        await this.repository.save(adotante);
        return { success: true };
    }            
}