import database from "../repository/configDb.js";
async function inserProfissao(nomeProfissao) {
    const conn = await database.connect();
    const sql = `CALL pc_insert_profissao(?)`;
    conn.query(sql,[nomeProfissao]);
    conn.end();
}
async function updateProfissao(nomeProfissao,id) {
    const conn = await database.connect();
    const sql = `CALL pc_update_profissao(?,?)`;
    conn.query(sql,[nomeProfissao,id]);
    conn.end();
}

async function findAll() {
    const conn = await database.connect();
    const sql = "select * from tbl_profissoes tp where tp.profissao_deletado = 0";
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

async function deletePorfissao(id) {
    const conn = await database.connect();
    const sql = "update tbl_profissoes tp set tp.profissao_deletado = 1 where tp.id_profissao = ?";
    conn.query(sql,[id]);
    conn.end();
}



export default {inserProfissao,updateProfissao,findAll,deletePorfissao};