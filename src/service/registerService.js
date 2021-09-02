import database from "../repository/configDb.js";
async function inserUsser(email , password, usuario) {
    const conn = await database.connect();
    const sql = 'insert into tbl_usuarios(email , senha, usuario) values(?,?,?)';
    const newUserData = [email , password, usuario];
    conn.query(sql,newUserData);
    conn.end();
}

function updateUser() {

}

export default {inserUsser};