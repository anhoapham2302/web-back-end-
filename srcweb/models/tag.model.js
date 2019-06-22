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
      },
      pagebytag: (posttag, limit, offset) =>{
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory, tag, posttag where PostID = TPostID and TagID = PTagID and PTagID = '${posttag}' and ChuyenMuc1 = CatID and ChuyenMuc2= ChildID  and TrangThai = 1 and DATEDIFF(CURDATE(), NgayXuatBan) > 0 order by NgayXuatBan desc limit ${limit} offset ${offset}`)
    },
    countbytag: (posttag) =>{
        return db.load(`select count(*) as total from posttag where TPostID = '${posttag}'`)
    },
};