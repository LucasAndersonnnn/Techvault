import { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Dados enviados", { email, password });
        alert("Dados enviados veja o f12");
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