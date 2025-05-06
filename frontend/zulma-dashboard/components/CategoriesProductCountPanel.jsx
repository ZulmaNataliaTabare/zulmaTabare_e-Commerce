
import React, { useEffect, useState } from "react";

function CategoriesProductCountPanel() {
    const [CategoriesWhitCount, setCategoriesWhitCount] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchCategoriesWhitCount = async () => {
        try {
            const response = await fetch("http://localhost:3002/api/products/categories/countBYCategories",);
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCategoriesWhitCount(data.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
        fetchCategoriesWhitCount();
    }, 
[]);

    if (loading) {
        return <div className="panel">Cargando...</div>;
    }

    if (error) {
        return <div className="panel">Error: {error.message}</div>;
    }

    if (!CategoriesWhitCount) {
        return <div className="panel">No hay información de categorías.</div>;
    }

    return (
        <div className="panel">
            <h3>Cantidad de productos por categorías:</h3>
            <div className="panel-content">
                {CategoriesWhitCount.map((category) => (
                    <p key={category.category_id}>
                        <strong>{category.category_name}:</strong> {category.count} productos
                    </p>
                ))}
            </div>
        </div>
    );
}
export default CategoriesProductCountPanel;