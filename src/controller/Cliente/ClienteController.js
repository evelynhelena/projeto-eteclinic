import express from 'express';
import {body, validationResult} from "express-validator";
import {cpf} from 'cpf-cnpj-validator';
const router = express.Router();
import db from "../../service/ClientesService.js";

router.post('/', [
    body('cep').isLength({min: 8, max:8}).withMessage("CEP Inválido"),
    body('cep').isNumeric().withMessage("CEP Deve ser numerico"),
    body('rua').isLength({min: 1}).withMessage("Rua inválida"),
    body('bairro').isLength({min: 1}).withMessage("Bairro inválido"),
    body('cidade').isLength({min: 1}).withMessage("Cidade inválida"),
    body('estado').custom((uf) =>{
        const ufAllow = ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO', 'MA', 'PI', 'CE', 'RN', 
        'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT', 'GO', 'DF'];
        if(!ufAllow.includes(uf.toUpperCase())) return Promise.reject("UF informado é inválido");
        
        return true;
    }),
    body('cpf').custom((numCpf) => {
        const checkCpf = cpf.isValid(numCpf);
        if(!checkCpf) return Promise.reject("CPF não é válido");

        return true;
    }),
    body('nome').isLength({min: 1}).withMessage("Nome Invalido"),
    body('telefone').isLength({min: 1}).withMessage("Telefone Inválido"),
    body('celular').isLength({min: 1}).withMessage("Celular Inválido"),
    body('email').isLength({min: 1}).withMessage("Email Inválido"),
    body('tipoSanguineo').custom((ts) =>{
        const tsAllow = ['A+', 'A-','B+', 'B-', 'O+', 'O-','AB+', 'AB-'];
        if(!tsAllow.includes(ts)) return Promise.reject("Tipo Sanguineo inválido"); 
        return true;
    })
], async (req, res) => {
    //Para Cadastrar 
    const client = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }
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