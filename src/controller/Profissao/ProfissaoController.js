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

router.put('/:id', async (req, res) => {
    const {nomeProfissao} = req.body;
    const id = req.params.id;
    try{
        await db.updateProfissao(nomeProfissao,id);
        res.status(201).send({mensage:'Profissão atualizada com sucesso'});
    }catch{
        res.status(500).send({mensage:`Erro ao atualizar a profissão. ${err}`});
    }
});

router.get('/', async (req, res) => {
    try{
        let dataProfissao = await db.findAll();
        res.status(201).send(dataProfissao);
    }catch{
        res.status(500).send({mensage:`Erro ao listar as profissões. ${err}`});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        await db.deletePorfissao(id);
        res.status(201).send({mensage:'Profissão deletado com sucesso'});
    }catch{
        res.status(500).send({mensage:`Erro ao deletar a profissões. ${err}`});
    }
});

export default router;