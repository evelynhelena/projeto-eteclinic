import express from "express";
import register from "./controller/Register/RegisterController.js";
import login from "./controller/Login/LoginController.js";
import {verifyJWT} from "./middlewares/jwt.js";
const router = express.Router();

router.use('/register',verifyJWT, register);
router.use('/login', login);
router.use('/login/reset', login);


router.use('/*',(req, res) => {
    res.status(404).send({message: "Caminho Não Encontrado"});
});

export default router;