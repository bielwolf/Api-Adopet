import express, { RequestHandler } from "express";
import AbrigoRepository from "../repositories/AbrigoRepository";
import { AppDataSource } from "../config/dataSource";
import AbrigoController from "../controller/AbrigoController";
import { middlewareValidadorBodyAbrigo } from "../middleware/validadores/abrigoRequestBody";
import { middlewareValidadorBodyEndereco } from "../middleware/validadores/enderecoRequestBody";
import { veificaIdMiddleware } from "../middleware/veificaId";


const router = express.Router();
const adotanteRepository = new AbrigoRepository(AppDataSource.getRepository("AbrigoEntity"));

const adotanteController = new AbrigoController(adotanteRepository);

const validateBodyAbrigo:RequestHandler = (req, res, next) => middlewareValidadorBodyAbrigo(req, res, next)

const validateBodyEndereco:RequestHandler = (req, res, next) => middlewareValidadorBodyEndereco(req, res, next)

router.post("/", validateBodyAbrigo, (req, res) => adotanteController.criaAbrigo(req, res));
router.get("/", (req, res) => adotanteController.listarAbrigos(req, res));
router.put("/:id", validateBodyAbrigo, (req, res) => adotanteController.atualizaAbrigo(req, res));
router.delete("/:id", veificaIdMiddleware, (req, res) => adotanteController.deletaAbrigo(req, res));
router.patch("/:id", veificaIdMiddleware, validateBodyEndereco, (req, res) => adotanteController.atualizaEnderecoAbrigo(req, res));

export default router;