
const fs = require('fs/promises');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

console.log("Ruta users.json:", usersFilePath); // Imprime la ruta


const User = {
    constructor() {
        this.usersFilePath = path.join(__dirname, '../data/users.json');
    },

    async getAll () {
        try {
            const data = await fs.readFile(usersFilePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer users.json (users.js):', error);
            return [];
        }
    },

    async findById (id) {
        const users = await User.getAll();
        return users.find(user => user.user_id === id);
    },

    async findByUsername (username)  {
        try {
            const users = await User.getAll();
            return users.find(user => user.user_name === username); // Usar user_name
        } catch (error) {
            console.error("Error en findByUsername:", error);
            return null; // Devuelve null en caso de error
        }
    },

    async update (id, data) {
        let users = await User.getAll();
        const userIndex = users.findIndex(user => user.user_id === id);

        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...data };
            try {
                await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
            } catch (error) {
                console.error('Error al escribir users.json:', error);
            }
        }
    },

    async getById(id) {
        const users = await User.getAll();
        return users.find(user => user.user_id === id);
    },
    
};

module.exports = User;