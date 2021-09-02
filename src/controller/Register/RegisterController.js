import express from 'express';
const router = express.Router();
import db from "../../service/registerService.js";
router.post('/', async (req, res) => {
    //Para Cadastrar 
    const {email,password,userName} = req.body;
    try{
        await db.inserUsser(email,password,userName);
        res.status(201).send({mensage:'usuario cadastrado com sucesso'});
    }catch{
        res.status(500).send({mensage:`Erro ao Inserir o usuário. ${err}`});
    }
});
export default router;