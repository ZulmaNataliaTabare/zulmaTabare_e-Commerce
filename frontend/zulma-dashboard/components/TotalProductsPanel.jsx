import React, { useEffect, useState } from 'react'; // Importo React y los hooks useEffect y useState

function TotalProductsPanel() { // Defino el componente TotalProductsPanel
    const [totalProducts, setTotalProducts] = useState(0); // Inicializo el estado totalProducts en 0
    const [loading, setLoading] = useState(true); // Inicializo el estado loading en true para mostrar el mensaje de carga
    const [error, setError] = useState(null); // Inicializo el estado error en null para manejar errores

    useEffect(() => { 
         // Defino una función asíncrona para obtener el total de productos
        const fetchTotalProducts = async () => {
                try {
                 const response = await fetch('http://localhost:3002/api/products/'); // Hago una llamada a la API para obtener el total de productos
                 if (!response.ok) { // Si la respuesta no es ok, lanzo un error
                      throw new Error(`HTTP error! status: ${response.status}`); // Lanza un error con el estado HTTP
                }
                 const data = await response.json(); // Parseo la respuesta JSON
                 setTotalProducts(data.count); // Asigno el total de productos al estado
                 setLoading(false); // Cambio el estado loading a false para indicar que la carga ha terminado
                } catch (error) {
                 setError(error.message); // Capturo el error y lo asigno al estado
                 setLoading(false); // Cambio el estado loading a false para indicar que la carga ha terminado
                }
        };
          fetchTotalProducts(); // Llama a la función para obtener el total de productos
    }, []); // El segundo argumento [] asegura que el efecto se ejecute solo una vez al montar el componente



    //     setTimeout(() => { // Simulo una llamada a la API con setTimeout
    //         setTotalProducts(50); // Simulo la respuesta de la API con un total de 50 productos
    //         setLoading(false); // Cambio el estado loading a false para indicar que la carga ha terminado
    //     }, 1500);
    // }, []);

    if (loading) { // Si loading es true, muestro el mensaje de carga
        return <div>Cargando total de productos...</div>; // Mensaje de carga
    }

    if (error) { // Si hay un error, muestro el mensaje de error
        return <div>Error al cargar el total de productos: {error}</div>;
    }

    return ( // Si no hay errores y la carga ha terminado, muestro el total de productos
        <div className="panel">
            <h3>Total de Productos</h3>
            <div className="panel-value">{totalProducts}</div>
            </div>
    );
}

export default TotalProductsPanel; // Exporto el componente TotalProductsPanel para que pueda ser utilizado en otros archivos

