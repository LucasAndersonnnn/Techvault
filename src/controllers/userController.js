const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt= require ('jsonwebtoken');

exports.criarUsuario = async (req, res) => {
    try {
    const { nome, email, password } = req.body
    if (!nome || !email || !password) { 
        return res.status(400).json ({ message: 'Preencha os dados.'});
    } 

    const existenciaUsuario = await db.query('SELECT * FROM users where email = $1', [email])

    if (existenciaUsuario.rows.length > 0) {
        return res.status(400).json ({ message: 'O email já está cadastrado'});
    }

    const salt = await bcrypt.genSalt(7);
    const passwordHash = await bcrypt.hash(password, salt);

    const novoUser = await db.query (
        'INSERT INTO users (nome, email, password) VALUES ($1, $2, $3) RETURNING *', [nome, email, passwordHash]
    );
    return res.status(201).json ({ message: 'Usuário cadastrado!'})
    } catch (erro){
        console.error(erro);
        res.status(500).json ({ message: "Erro" });
    }
}


exports.loginUsuario = async (req, res) => {
    console.log("TENTATIVA");
    console.log(req.body);
    try {
        const { email, password} = req.body
        if (!email || !password) {
            return res.status(400).json ({ message: "Está faltando email ou senha."}); 
        } 

        const resultado = await db.query ('SELECT * from users where email = $1', [email])

        if (resultado.rows.length === 0)  {
            return res.status(400).json ({ message: "Credenciais inválidas"});
        }

        const usuario = resultado.rows[0];
        const senhaValida = await bcrypt.compare(password, usuario.password);

        if (!senhaValida) {
            return res.status(400).json ({ message: "Credenciais invalidas"}); 
        }

        const token = jwt.sign ({ id: usuario.id, nome: usuario.nome }, process.env.JWT_SECRET, { expiresIn: '1h'}); 
    
        res.status(200).json ({ message: "Login Concluido!", token: token })
    } catch (erro){
        console.error(erro);
        return res.status(500).json ({ message: "Quebrou tudo" });
    }
}



exports.perfilUsuario = async (req, res) => {
    res.json ({
        mensagem: "aaaa",
        dados_do_token: req.user
    });
};