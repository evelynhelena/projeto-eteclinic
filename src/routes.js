import express from "express";
import register from "./controller/Register/RegisterController.js";
import cliente from "./controller/Cliente/ClienteController.js";
import login from "./controller/Login/LoginController.js";
import profissao from "./controller/Profissao/ProfissaoController.js"
import {verifyJWT} from "./middlewares/jwt.js";
const router = express.Router();

router.use('/register', register);
router.use('/cliente', cliente);
router.use('/profissao', profissao);
router.use('/login', login);
router.use('/login/reset', login);


router.use('/*',(req, res) => {
    res.status(404).send({message: "Caminho Não Encontrado"});
});

export default router;