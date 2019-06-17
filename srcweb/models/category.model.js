var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from category');
    },
    allWithDetails: () =>{
        return db.load(`SELECT *
        FROM category, childcategory	
        WHERE CatID = Parent
        `)
    },
    add: entity =>{
        return db.add('category', entity);
    }
};