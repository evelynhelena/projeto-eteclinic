import jwt from 'jsonwebtoken';

function generatePasswords(){
    // + 1 para não pegar o valor 0;
    // .toString(36) pega letras tbm;
    //.substr(2) pega os valores apos o 1.
    const key =  (Math.random() + 1).toString(36).substr(2);
    const newPassword = key
    .replace('n','@')
    .replace('w','!')
    .replace('i','$')
    .replace('t','#')
    .replace('a','*')
    return newPassword;
}

function generateToken(idLogin,user){
    const secret = "aceitamos o amor que achamos merecer";
    return jwt.sign({infoUser: {
        idUser: idLogin,
        userName: user
    }},secret,{expiresIn: 60 * 60 * 5});
}

export {generatePasswords,generateToken};