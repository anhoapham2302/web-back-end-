var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load(`select * from tag`);
    },

    single: id => {
        return db.load(`select * from tag where TagID = ${id}`);
      },
    

    add: entity =>{
        return db.add(`tag`, entity);
    },

    update: entity => {
        return db.update('tag', 'TagID', entity);
      },
    
      delete: id => {
        return db.delete('tag', 'TagID', id);
      }
};