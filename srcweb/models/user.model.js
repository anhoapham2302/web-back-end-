var db = require('../utils/db');

module.exports = {
    all: () => {
      return db.load('select * from user, role where URole = RoleID');
    },
  
    single: id => {
      return db.load(`select * from user,role where UID = ${id} and URole = RoleID`);
    },
  
    singleByUserName: userName => {
      return db.load(`select *,DATE_FORMAT(UDateCreate, '%d-%m-%Y') UDateCreateFormat from user, role where UUsername = '${userName}' and URole = RoleID`);
    },
  
    add: entity => {
      return db.add('user', entity);
    },
  
    update: entity => {
      return db.update('user', 'UID', entity);
    },
  
    delete: id => {
      return db.delete('user', 'UID', id);
    }
  };
  