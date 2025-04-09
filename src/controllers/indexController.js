const db = require('../database/models'); 


const { filterProducts: myFilterProducts } = require('../utils/utils.js'); // Importa la función de filtrado

const indexController = {
    home: async (req, res) => {
        try {

            const [carouselItems,products_sales] = await Promise.all([
                db.Product.findAll({
                    where : {
                        section_id : 1
                    },
                    order: [
                        [db.Sequelize.literal('RAND()')]
                    ],
                    limit: 5
                }),
                db.Product.findAll({
                    where : {
                        section_id : 2
                    },
                    order: [
                        [db.Sequelize.literal('RAND()')]
                    ],
                    limit: 3
                })
            
            ])
    
            res.render('index', {
                title: 'Inicio',
                products : products_sales,
                carouselItems
            });
        } catch (error) {
            console.log(error);
            
        }
    },
};

module.exports = indexController;