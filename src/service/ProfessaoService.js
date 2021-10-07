import database from "../repository/configDb.js";
async function inserProfissao(nomeProfissao) {
    const conn = await database.connect();
    const sql = `CALL pc_insert_profissao(?)`;
    conn.query(sql,[nomeProfissao]);
    conn.end();
}

export default {inserProfissao};