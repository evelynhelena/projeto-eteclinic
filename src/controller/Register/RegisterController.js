import express from 'express';
const router = express.Router();
import db from "../../service/registerService.js";
import {body, validationResult} from "express-validator";

router.post('/', [
    body('email').isEmail().withMessage('Informe um email valido'),
    body('password').isLength({min: 8 , max:15}).withMessage('Informe uma senha entre 8 e 15 caracteres'),
    body('userName').custom((userName) => {
        if(userName && userName.split(' ').length > 1) {
            return Promise.reject(" Nome de usuário não pode conter espaços")
        };
        return true
    })
],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }
    //Para Cadastrar 
    const {email,password,userName} = req.body;
    try{
        const checkMailUser = await db.checkEmail(email);
        if(checkMailUser.length > 0){
            return res.status(400).send({mensage:'Email já cadastrado no sistema'});
        }
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