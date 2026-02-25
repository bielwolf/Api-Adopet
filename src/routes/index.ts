import express from "express";
import PetRouter from "./petRouter";

const router = (app:express.Router) => {
    app.use("/pets", PetRouter);
}

export default router;  