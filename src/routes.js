import express from "express";
import register from "./controller/Register/RegisterController.js";
const router = express.Router();
router.use('/register', register);

router.use('/*',(req, res) => {
    res.status(404).send({message: "Caminho Não Encontrado"});
});

export default router;