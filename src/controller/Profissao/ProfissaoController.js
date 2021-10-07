import express from 'express';
const router = express.Router();
import db from '../../service/ProfessaoService.js';

router.post('/', async (req, res) => {
    const {nomeProfissao} = req.body;
    try{
        await db.inserProfissao(nomeProfissao);
        res.status(201).send({mensage:'Profissão inserida com sucesso'});
    }catch{
        res.status(500).send({mensage:`Erro ao inserir a profissão. ${err}`});
    }
});

export default router;