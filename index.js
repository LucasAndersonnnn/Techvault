const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./src/db');
const routes = require('./src/routes/routes');



const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Informações');
});

app.get('/teste-banco', async (req,res) => {
    try {
    const resultado = await db.query('SELECT NOW()');
    res.json (resultado.rows[0]);
    } catch (erro){
        console.log(erro);
        res.status(500).json ({ mensagem: "Erro ao conectar ao banco"});
    }
});

app.listen (PORT, () => console.log(`Server ligado na porta ${PORT}`));
