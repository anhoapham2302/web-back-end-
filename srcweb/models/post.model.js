var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post`);
    },
    singleByPostID: postID => {
        return db.load(`select *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat from post where PostID = '${postID}'`);
      },
};