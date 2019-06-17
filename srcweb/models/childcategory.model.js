var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load(`select * from childcategory`);
    },

    allbycat: catID =>{
        return db.load(`select * from childcategory where Parent = ${catID}`)
    },


    add: entity =>{
        return db.add(`childcategory`, entity);
    }
};