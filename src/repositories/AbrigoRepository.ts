import { Repository } from "typeorm";
import AbrigoEntity from "../entities/AbrigoEntity";
import InterfaceAbrigoRepository from "./interfaces/InterfaceAbrigoRepository";
import EnderecoEntity from "../entities/EnderecoEntity";
import { NotFound, RequestBad } from "../utils/manipulaErros";

export default class AbrigoRepository implements InterfaceAbrigoRepository {
    private repository: Repository<AbrigoEntity>;

    private async verificaCelularAbrigo(celular: string): Promise<boolean> {
        return !!(await this.repository.findOne({ where: { celular } }));
    }
    private async verificaEmailAbrigo(email: string): Promise<boolean> {
        return !!(await this.repository.findOne({ where: { email } }));
    }

    constructor(repository: Repository<AbrigoEntity>) {
        this.repository = repository;
    }

    async criaAbrigo(abrigo: AbrigoEntity): Promise<void> {
        if (
        (await this.verificaCelularAbrigo(abrigo.celular)) ||
            (await this.verificaEmailAbrigo(abrigo.email)) 
        ){  
            throw new RequestBad("Celular ou Email já cadastrado");
        }
        await this.repository.save(abrigo);
    }

    async listarAbrigos(): Promise<AbrigoEntity[]> {
        return await this.repository.find();
    }

    async atualizaAbrigo(id: number, abrigo: AbrigoEntity) {
        const abrigoToUpdate = await this.repository.findOne({ where: { id } });

        if (!abrigoToUpdate) {
            throw new NotFound("Abrigo não encontrado");
        }

        Object.assign(abrigoToUpdate, abrigo);

        await this.repository.save(abrigoToUpdate);

        return { success: true };
    }
    async deletaAbrigo(id: number) {
        const abrigoToDelete = await this.repository.findOne({ where: { id } });
        
        if (!abrigoToDelete) {
            throw new NotFound("Abrigo não encontrado");
        }

        await this.repository.remove(abrigoToDelete);

        return { success: true };

    }
    async atualizaEnderecoAbrigo(idAbrigo: number, endereco: EnderecoEntity) {
        const abrigo = await this.repository.findOne({ where: { id: idAbrigo }});

        if (!abrigo) {
            throw new NotFound("Abrigo não encontrado");
        }

        const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
        abrigo.endereco = novoEndereco;

        await this.repository.save(abrigo);
        return { success: true };
    }            
}