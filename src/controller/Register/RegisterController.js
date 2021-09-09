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

router.put('/:id', async (req, res) => {
    //Para Cadastrar 
    const {email,password,userName} = req.body;
    const id = req.params.id;
    try{
        await db.updateUser(email,password,userName,id);
        res.status(201).send({mensage:'usuario editado com sucesso'});
    }catch{
        res.status(500).send({mensage:`Erro ao editar o usuário. ${err}`});
    }
});

router.delete('/:id', async (req, res) => {
    //Para Cadastrar 
    const id = req.params.id;
    try{
        await db.desative(id);
        res.status(201).send({mensage:'usuario desativado com sucesso'});
    }catch{
        res.status(500).send({mensage:`Erro ao desativar o usuário. ${err}`});
    }
});

router.get('/', async (req, res) => {
    try{
        let dataUsers = await db.findAll();
        res.status(201).send(dataUsers);
    }catch{
        res.status(500).send({mensage:`Erro ao resgatar os usuarios.`});
    }
});

export default router;