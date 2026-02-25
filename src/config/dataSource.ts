import { DataSource } from "typeorm";
import PetEntity from "../entities/PetEntity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/config/database.sqlite",
    synchronize: true,
    entities: [PetEntity],
})