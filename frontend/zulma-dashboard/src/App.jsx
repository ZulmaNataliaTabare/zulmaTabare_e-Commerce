import React from 'react';
import TotalProductsPanel from '../components/TotalProductsPanel.jsx'; // Importo el componente TotalProductsPanel
import './css/App.css'; // Importo el archivo CSS para estilos
import TotalUsersPanel from '../components/TotalUsersPanel.jsx';
import TotalCategoriesPanel from '../components/TotalCategoriesPanel.jsx';
import LastUserDetailPanel from '../components/LastUserDetailPanel.jsx';
import CategoriesProductCountPanel from '../components/CategoriesProductCountPanel.jsx';
import ProductListPanel from '../components/ProductListPanel.jsx';

// function App() { return (<div><h1>Zulma Dashboard</h1></div>); } export default App;

function App() { // Defino el componente principal App
    return (
        <div className="Dashboard">
            <h1>E-Commerce Dashboard</h1>
            <TotalProductsPanel/>
            <TotalUsersPanel/>
            <TotalCategoriesPanel/>
            {/* <LastUserDetailPanel/> */}
            <CategoriesProductCountPanel/>
            <ProductListPanel/>
        </div>
    );
} 
export default App; // Exporto el componente App para que pueda ser utilizado en otros archivos

