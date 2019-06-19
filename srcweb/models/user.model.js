var db = require('../utils/db');

module.exports = {
    all: () => {
      return db.load('select * from user, role where URole = RoleID');
    },
  
    single: id => {
      return db.load(`select * from user where UID = ${id}`);
    },
  
    singleByUserName: userName => {
      return db.load(`select *,DATE_FORMAT(UDateCreate, '%d-%m-%Y') UDateCreateFormat from user, role where UUsername = '${userName}' and URole = RoleID`);
    },
  
    add: entity => {
      return db.add('user', entity);
    },
  
    update: entity => {
      var id = entity.UID;
      delete entity.UID;
      return db.update('user', 'UID', entity, id);
    },
  
    delete: id => {
      return db.delete('user', 'UID', id);
    }
  };
  