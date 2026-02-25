import express from "express";
import PetRouter from "./petRouter";
import AdotanteRouter from "./adotanteRouter";

const router = (app:express.Router) => {
    app.use("/pets", PetRouter);
    app.use("/adotantes", AdotanteRouter);
}

export default router;  