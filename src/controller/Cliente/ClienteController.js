import express from 'express';
const router = express.Router();
import db from "../../service/ClientesService.js";

router.post('/', async (req, res) => {
    //Para Cadastrar 
    const client = req.body;
    try{
        await db.inserClient(client);
        res.status(201).send({mensage:'Cliente Inserido com sucesso'});
    }catch{
        res.status(500).send({mensage:`Erro ao inserir o cliente. ${err}`});
    }
});

router.put('/:id', async (req, res) => {
    const client = req.body;
    const id = req.params.id;
    try{
        await db.updateClient(client,id);
        res.status(201).send({mensage:'Cliente atualizado com sucesso'});
    }catch{
        res.status(500).send({mensage:`Erro ao atualizar o cliente. ${err}`});
    }
});



router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        await db.desativeClient(id);
        res.status(201).send({mensage:'Cliente desativado com sucesso'});
    }catch{
        res.status(500).send({mensage:`Erro ao desativar o cliente. ${err}`});
    }
});

router.get('/',async (req, res) =>{
    try{
        let dataCliente = await db.findAll();
        res.status(201).send(dataCliente);
    }catch{
        res.status(500).send({mensage:`Erro ao resgatar os clientes.`});
    }
})

export default router;