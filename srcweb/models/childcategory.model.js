var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load(`select * from childcategory`);
    },

    allbycat: catID =>{
        return db.load(`select * from childcategory, category where Parent = ${catID} and Parent = CatID`)
    },


    add: entity =>{
        return db.add(`childcategory`, entity);
    },

    update: entity => {
        return db.update('childcategory', 'ChildID', entity);
      },
    
      delete: id => {
        return db.delete('childcategory', 'ChildID', id);
      }
};