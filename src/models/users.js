
const fs = require('fs/promises');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

console.log("Ruta users.json:", usersFilePath); // Imprime la ruta


const User = {
    getAll: async () => {
        try {
            const data = await fs.readFile(usersFilePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer users.json (users.js):', error);
            return [];
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
            users[userIndex] = { ...users[userIndex], ...data };
            try {
                await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
            } catch (error) {
                console.error('Error al escribir users.json:', error);
            }
        }
    },

    getById: async (id) => {
        const users = await User.getAll();
        return users.find(user => user.id === id);
    },
    
};

module.exports = User;