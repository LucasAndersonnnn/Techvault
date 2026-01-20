import { useState } from 'react';
import axios from 'axios';



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post('http://localhost:5000/api/login', { email, password })
        localStorage.setItem('token', response.data.token);
        alert("Sucesss man")
    }catch(error) {
        console.error("Erro brutal", error);
        if (error.response) {
            console.log("Resposta", error.response.data);
            alert(error.response.data.message);
        } else {
            console.log("server caiu");
        }
    }
}
    return (
        <div className="container">
            <h2>Login</h2>
        <form onSubmit={handleSubmit}>
        <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>    
        <div>
             <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit">Entrar</button>
        </form>
        </div>
    );
}




export default Login;