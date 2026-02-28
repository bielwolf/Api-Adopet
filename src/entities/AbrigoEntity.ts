import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import EnderecoEntity from "./EnderecoEntity";
import PetEntity from "./PetEntity";
import { criaSenhaCriptografada } from "../utils/senhaCriptografada";

@Entity()
export default class AbrigoEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nome: string;
    @Column({ unique: true })
    email: string;
    @Column({unique: true})
    celular: string;
    @Column()
    senha: string;

    @OneToOne(() => EnderecoEntity, { 
        nullable: true, 
        cascade: true, 
        eager: true 
    })
    @JoinColumn()
    endereco?: EnderecoEntity;
    
    @OneToMany(() => PetEntity, (pet) => pet.adotante)
    pets!: PetEntity[];
    
    constructor(nome: string, email: string, senha: string, celular: string,  endereco?: EnderecoEntity) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.celular = celular;
        this.endereco = endereco;
    }

    @BeforeInsert()
    @BeforeUpdate()
    private async criptografaSenha() {
        this.senha = criaSenhaCriptografada(this.senha);
    }
}