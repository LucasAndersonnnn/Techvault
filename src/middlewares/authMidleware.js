const jwt = require ('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {

    const authHeader = req.headers['authorization'];

     if (!authHeader) {
        return res.status(400).json ({ message: "Acesso Negado."})
    } 
        
    const token = authHeader.split(' ')[1];

    try {
        const decoded =  jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (erro) {
        res.status(400).json ({ message: "token invalido" });
    }
}