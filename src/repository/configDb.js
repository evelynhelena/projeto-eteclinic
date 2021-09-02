import mysql from 'mysql2/promise';

async function connect(){
    const datainfo = {
        host : 'localhost',
        user :'root',
        password :'',
        database :'eteclinic'
    };

    const connction = await mysql.createConnection(datainfo);

    return connction;
}

export default {connect};