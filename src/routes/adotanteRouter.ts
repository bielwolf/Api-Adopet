import express, { RequestHandler } from "express";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidadorBodyAdotante } from "../middleware/validadores/adotanteRequestBody";
import { middlewareValidadorBodyEndereco } from "../middleware/validadores/enderecoRequestBody";
import { veificaIdMiddleware } from "../middleware/veificaId";

const router = express.Router();
const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository("AdotanteEntity"));
const adotanteController = new AdotanteController(adotanteRepository);

const validateBodyAdotante:RequestHandler = (req, res, next) => middlewareValidadorBodyAdotante(req, res, next)

const validateBodyEndereco:RequestHandler = (req, res, next) => middlewareValidadorBodyEndereco(req, res, next)

router.post("/", validateBodyAdotante, (req, res) => adotanteController.criaAdotante(req, res));
router.get("/", (req, res) => adotanteController.listarAdotantes(req, res));
router.put("/:id", veificaIdMiddleware, (req, res) => adotanteController.atualizaAdotante(req, res));
router.delete("/:id", veificaIdMiddleware, (req, res) => adotanteController.deletaAdotante(req, res));
router.patch("/:id",veificaIdMiddleware, validateBodyEndereco, (req, res) => adotanteController.atualizaEnderecoAdotante(req, res));

export default router;