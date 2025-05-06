import React, { useState, useEffect } from 'react';

function TotalCategoriesPanel() {
    const [totalCategories, setTotalCategories] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTotalCategories = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/products/categories/count');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setTotalCategories(data.count);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        
        fetchTotalCategories();
    }, []);

    if (loading) {
        return <div>Cargando total de categorías...</div>;
    }

    if (error) {
        return <div>Error al cargar el total de categorías: {error}</div>;
    }

    return (
        <div className="panel">
            <h3>Total de Categorías</h3>
            <div className="panel-value">{totalCategories}</div>
        </div>
    );
}

export default TotalCategoriesPanel;