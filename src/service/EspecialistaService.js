import database from "../repository/configDb.js";
async function insertEspecialista(especialista) {
    const conn = await database.connect();
    const newEspecialista = [
        especialista.cep, 
        especialista.rua, 
        especialista.numero,
        especialista.bairro,
        especialista.cidade,
        especialista.estado,

        especialista.nome,
        especialista.registro,
        especialista.telefone,
        especialista.celular,
        especialista.email,
        especialista.idProfissao,
    ];
    const sql = `CALL pc_insert_especialista(?,?,?,?,?,?,?,?,?,?,?,?)`;
    conn.query(sql,newEspecialista);
    conn.end();
}

async function updateEspecialista(especialista,id) {
    const conn = await database.connect();
    const newEspecialista = [
        especialista.idEndereco, 
        especialista.cep, 
        especialista.rua, 
        especialista.numero,
        especialista.bairro,
        especialista.cidade,
        especialista.estado,

        id,
        especialista.nome,
        especialista.registro,
        especialista.telefone,
        especialista.celular,
        especialista.email,
        especialista.idProfissao,
    ];
    const sql = `CALL pc_update_especialista(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    conn.query(sql,newEspecialista);
    conn.end();
}

async function findAll() {
    const conn = await database.connect();
    const sql = `select * from tbl_especialistas te where te.especialista_deletado = 0`;
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

async function deleteEscpecialista(id) {
    const conn = await database.connect();
    const sql = `update tbl_especialistas te set te.especialista_deletado = 1 where te.id_especialista = ?`;
    await conn.query(sql,[id]);
    conn.end();
}

export default {insertEspecialista,findAll,deleteEscpecialista,updateEspecialista};