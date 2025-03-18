const fs = require('node:fs/promises');

async function generarInsertUsers(data) {
    let sql = "";
    for (const usuario of data) {
        sql += `INSERT INTO usuarios (id, nombre, email) VALUES (<span class="math-inline">\{usuario\.id\}, '</span>{usuario.nombre}', '${usuario.email}');\n`;
    }
    return sql;
}

async function generarInsertProductos(data) {
    let sql = "";
    for (const producto of data) {
        sql += `INSERT INTO productos (id, nombre, precio, categoria_id) VALUES (<span class="math-inline">\{producto\.id\}, '</span>{producto.nombre}', ${producto.precio}, ${producto.categoria_id});\n`;
    }
    return sql;
}

async function generarInsertCategorias(data) {
    let sql = "";
    for (const categoria of data) {
        sql += `INSERT INTO categorias (id, nombre) VALUES (<span class="math-inline">\{categoria\.id\}, '</span>{categoria.nombre}');\n`;
    }
    return sql;
}

async function main() {
    let sqlContent = "-- Script para poblar la base de datos\n\n";

    try {
        // Poblar tabla de usuarios
        const usuariosData = JSON.parse(await fs.readFile('users.json', 'utf8'));
        sqlContent += "-- Poblar tabla de usuarios\n";
        sqlContent += await generarInsertUsuarios(usuariosData);
        sqlContent += "\n";

        // Poblar tabla de productos
        const productosData = JSON.parse(await fs.readFile('products.json', 'utf8'));
        sqlContent += "-- Poblar tabla de productos\n";
        sqlContent += await generarInsertProductos(productosData);
        sqlContent += "\n";

        // Poblar tabla de categorías
        const categoriasData = JSON.parse(await fs.readFile('categorias.json', 'utf8'));
        sqlContent += "-- Poblar tabla de categorías\n";
        sqlContent += await generarInsertCategorias(categoriasData);
        sqlContent += "\n";

        // Escribir todo al archivo data.sql
        await fs.writeFile('data.sql', sqlContent, 'utf8');

        console.log('Archivo data.sql generado exitosamente.');

    } catch (error) {
        console.error('Error al generar el archivo data.sql:', error);
    }
}

main();