import React, { useEffect, useState } from 'react';

function ProductListPanel() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:3002/api/products/?page=${page}&limit=${limit}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data.products);
                setTotalProducts(data.totalProducts);
                setTotalPages(data.totalPages);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, limit]);

    const goToPreviousPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    const goToNextPage = () => {
        if (page < totalPages) {
            setPage(nextPage => nextPage + 1);
        }
    };

    if (loading) {
        return <div className="panel">Loading products...</div>;
    }

    if (error) {
        return <div className="panel">Error: {error}</div>;
    }

    return (
        <div className="panel">
            <h3>Lista de Productos</h3>
            <div className="panel-content">
                {products.map(product => (
                    <p key={product.product_id}>
                        <strong>{product.product_name} - Precio:</strong> ${product.price}
                    </p>
                ))}
            </div>
            <div className="pagination">
                <button onClick={goToPreviousPage} disabled={page === 1}>Anterior</button>
                <span>Página {page} de {totalPages} (Total de Productos: {totalProducts})</span>
                <button onClick={goToNextPage} disabled={page === totalPages}>Siguiente</button>
            </div>
        </div>
    );
}

export default ProductListPanel;