
const fs = require('fs/promises');
const path = require('path');
const usersFilePath = path.join(__dirname, './src/data/users.json');

console.log("Ruta users.json:", usersFilePath); // Imprime la ruta


const User = {
    getAll: async () => {
        try {
            const data = await fs.readFile('./src/data/users.json', 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer Users.json:', error);
            return []; // Devuelve un array vacío en caso de error
        }
    },

    findById: async (id) => {
        const users = await User.getAll();
        return users.find(user => user.id === id);
    },

    findByUsername: async (username) => {
        try {
            const users = await User.getAll();
            return users.find(user => user.nombreusuario === username); // Usar nombreusuario
        } catch (error) {
            console.error("Error en findByUsername:", error);
            return null; // Devuelve null en caso de error
        }
    },

    update: async (id, data) => {
        let users = await User.getAll();
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...data }; // Actualiza los datos
            try {
                await fs.writeFile('./src/data/users.json', JSON.stringify(users, null, 2), 'utf8'); // Escribe los cambios en el archivo
            } catch (error) {
                console.error('Error al escribir users.json:', error);
            }
        }
    }
};

module.exports = User;