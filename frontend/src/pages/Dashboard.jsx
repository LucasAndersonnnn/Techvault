import { useState, useEffect } from 'react';
import axios from 'axios';


function Dashboard() {
    const [ user, setUser] = useState(null); //Começa null
    const [ error, setError] = useState(null);

    useEffect(() => {

    const fetchUser = async () => {

    const token = localStorage.getItem('token');

    if (!token) {
        setError( "Acesso invalido.");
        return;
    }

        try {
            const response = await axios.get('http://localhost:5000/api/perfil', {headers: {'Authorization': `Bearer ${token}`}});
            setUser(response.data);
        } catch(erro) {
           console.error(erro);
           setError("Falha ao buscar dados"); 
        }
    };

    fetchUser();
}, []); //Lista vazia q só roda quando a tela abre

    return (
        <div className="container"> {/*Aqui fica informações do perfil ou erro se der erro.*/}
            <h1>Setor Privado</h1>
            {user ? (
                <div>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                    </div>
            ) : (
                <div>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                !error && <p>Carregando...</p>
                </div>
            )}
        </div>
    );
}


export default Dashboard;