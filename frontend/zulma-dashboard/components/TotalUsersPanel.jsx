import React, { useEffect, useState } from 'react';

function TotalUsersPanel() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Defino una función asíncrona para obtener el total de usuarios
        const fetchTotalUsers = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/users/'); // Hago una llamada a la API para obtener el total de usuarios
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`); 
                }
                const data = await response.json();
                setTotalUsers(data.count); // Asigna el total de usuarios al estado
                setLoading(false); // Cambia el estado de carga a falso
            } catch (error) {
                setError(error.message); // Captura el error y lo asigna al estado
                setLoading(false); // Cambia el estado de carga a falso
            }
        }; 
        fetchTotalUsers(); // Llama a la función para obtener el total de usuarios
    }, []); // El segundo argumento [] asegura que el efecto se ejecute solo una vez al montar el componente
    
    
    //     setTimeout(() => {
    //         setTotalUsers(120); // Simula 120 usuarios
    //         setLoading(false); // Cambia el estado de carga a falso
    //     }, 1500); // Simula un retraso de 1.5 segundos
    // }, []);

    if (loading) {
        return <div> Cargando total de usuarios... </div>;
    }
    if (error) {
        return <div>Error al cargar los usuarios: {error.message}</div>;
    }

    return (
        <div className="panel">
            <h3>Total de Usuarios</h3>
            <div className="panel-value">{totalUsers}</div>
        </div>
    );
}

export default TotalUsersPanel;
// Este componente simula la carga de un total de usuarios. 
// En un caso real, debo hacer una llamada a una API para obtener el número real de usuarios.