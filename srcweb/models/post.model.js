var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory where ChuyenMuc1 = CatID and ChuyenMuc2= ChildID`);
    },
    singleByPostID: postID => {
        return db.load(`select *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat from post, category, childcategory where PostID = '${postID}' and ChuyenMuc1 = CatID and ChuyenMuc2 = ChildID`);
      },
    topview1:()=>{
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory where ChuyenMuc1 = CatID and ChuyenMuc2= ChildID order by View desc limit 1`)
    },
    allbycat: postCat=>{
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory where ChuyenMuc1 = '${postCat}' and ChuyenMuc1 = CatID and ChuyenMuc2= ChildID order by NgayXuatBan desc`)
    },
    allbychildcat: postCat=>{
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory where ChuyenMuc2 = '${postCat}' and ChuyenMuc1 = CatID and ChuyenMuc2= ChildID order by NgayXuatBan desc`)
    },
    premiumpost: () => {
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory where ChuyenMuc1 = CatID and ChuyenMuc2= ChildID and Premium = 'Y'`);
    },
};