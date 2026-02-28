import express from "express";
import PetRouter from "./petRouter";
import AdotanteRouter from "./adotanteRouter";
import abrigoRouter from "./abrigoRouter";

const router = (app:express.Router) => {
    app.use("/pets", PetRouter);
    app.use("/adotantes", AdotanteRouter);
    app.use("/abrigos", abrigoRouter);
}

export default router;  