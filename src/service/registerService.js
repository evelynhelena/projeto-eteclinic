import database from "../repository/configDb.js";
async function inserUsser(email , password, usuario) {
    const conn = await database.connect();
    const sql = 'insert into tbl_usuarios(email , senha, usuario) values(?,?,?)';
    const newUserData = [email , password, usuario];
    conn.query(sql,newUserData);
    conn.end();
}

async function updateUser(email , password, usuario,id) {
    const conn = await database.connect();
    const sql = `update tbl_usuarios set email = ? , senha = ?, usuario = ? where id_login = ${id}`;
    const newUserData = [email , password, usuario];
    conn.query(sql,newUserData);
    conn.end();
}

async function desative(id) {
    const conn = await database.connect();
    const sql = `update tbl_usuarios set usuario_deletado = 1 where id_login = ${id}`;
    conn.query(sql);
    conn.end();
}

async function findAll() {
    const conn = await database.connect();
    const sql = `select * from tbl_usuarios where usuario_deletado = 0`;
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

async function checkEmail(userEmail){
    const conn = await database.connect();
    const sql = "select * from tbl_usuarios where email = ?";
    const [rows] = await conn.query(sql,userEmail);
    conn.end();
    return rows;
}

export default {inserUsser,updateUser,desative,findAll,checkEmail};