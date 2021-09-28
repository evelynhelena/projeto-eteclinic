import database from "../repository/configDb.js";
async function inserClient(client) {
    const conn = await database.connect();
    const sql = `call pc_cliente_endereco(?,?,?,?,?,?,?,?,?,?,?,?)`;
    const newClientData = [    
        client.cep, 
        client.rua, 
        client.numero,
        client.bairro,
        client.cidade,
        client.estado,
        client.cpf,
        client.nome,
        client.telefone,
        client.celular,
        client.email,
        client.tipoSanguineo]
    conn.query(sql,newClientData);
    conn.end();
}

async function updateClient(client,id) {
    const conn = await database.connect();
    const sql = `call pc_update_cliente(?,?,?,?,?,?,?,?,?)`;
    const clientData = [    
        client.cpf,
        client.nome,
        client.telefone,
        client.celular,
        client.email,
        client.tipoSanguineo,
        client.fkEndereco,
        client.clienteDeletado,
        id,
    ]
    conn.query(sql,clientData);
    conn.end();
}

async function desativeClient(id){
    const conn = await database.connect();
    const sql = `update tbl_clientes set cliente_deletado = 1 where id_cliente = ${id}`
    conn.query(sql);
    conn.end();
}

async function findAll(id){
    const conn = await database.connect();
    const sql = `select * from tbl_clientes where cliente_deletado = 0`;
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

export default {inserClient,updateClient,desativeClient,findAll};