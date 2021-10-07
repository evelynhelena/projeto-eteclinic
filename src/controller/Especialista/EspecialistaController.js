import express from 'express';
const router = express.Router();
import db from "../../service/EspecialistaService.js";

router.post('/', async (req, res) => {
    const especialista = req.body;
    try{
        await db.insertEspecialista(especialista);
        res.status(201).send({mensage:'Especialista inerido com sucesso'});
    }catch{
        res.status(500).send({mensage:`Erro ao inserir o(a) especialista. ${err}`});
    }
});

router.put('/:id', async (req, res) => {
    const especialista = req.body;
    const id = req.params.id;
    try{
        await db.updateEspecialista(especialista,id);
        res.status(201).send({mensage:'Especialista atualizado com sucesso'});
    }catch{
        res.status(500).send({mensage:`Erro ao atualizar o(a) especialista. ${err}`});
    }
});

router.get('/', async (req, res) => {
    try{
        const dataEspecialista = await db.findAll();
        res.status(201).send(dataEspecialista);
    }catch{
        res.status(500).send({mensage:`Erro ao listar os(as) especialistas. ${err}`});
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        await db.deleteEscpecialista(id);
        res.status(201).send({mensage:'Especialista deletado com sucesso'});
    }catch{
        res.status(500).send({mensage:`Erro ao listar os(as) especialistas. ${err}`});
    }
});

export default router;