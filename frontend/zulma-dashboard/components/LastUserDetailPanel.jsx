
// import React, { useEffect, useState } from 'react';

// function LastUserDetailPanel() {

//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await fetch('http://localhost:3002/api/users/latest');
//                 if (!response.ok) {
//                     throw new Error(`¡Error HTTP! estado: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 console.log('Respuesta completa de la API:', data);
//                 setUser(data.data);
//                 console.log('Estado del usuario:', data.data);
//                 setLoading(false);
//             } catch (error) {
//                 setError(error);
//                 setLoading(false);
//             }
//         };
//         fetchUser();
//     }, []);

//     if (loading) {
//         return <div className="panel">Cargando...</div>;
//     }

//     if (error) {
//         return <div className="panel">Error: {error.message}</div>;
//     }


//     if (!user) {
//         return <div className="panel">No user information available.</div>;
//     }

//     return (
//         <div className="panel">
//             <h3>Detalles del último usuario</h3>
//             <div className="panel-content">
//                 <p>
//                     <strong>Nombre:</strong> {user.first_name}
//                 </p>
//                 <p>
//                     <strong>Apellido:</strong> {user.last_name}
//                 </p>
//                 <p>
//                     <strong>Correo:</strong> {user.email}
//                 </p>
                
//                 <p>
//                     <strong>Fecha de creación:</strong>{' '}
//                     {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'No date'}
// </p>
//             </div>
//         </div>
//     );
// }
// export default LastUserDetailPanel;
