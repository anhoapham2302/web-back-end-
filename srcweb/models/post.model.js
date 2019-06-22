var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory where ChuyenMuc1 = CatID and ChuyenMuc2= ChildID  and TrangThai = 1`);
    },
    top3:()=>{
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory where ChuyenMuc1 = CatID and ChuyenMuc2= ChildID and TrangThai = 1 and DATEDIFF(CURDATE(), NgayXuatBan) > 0 order by View desc limit 3`);
    },
    top:()=>{
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory where ChuyenMuc1 = CatID and ChuyenMuc2= ChildID and TrangThai = 1 and DATEDIFF(CURDATE(), NgayXuatBan) > 0 order by View desc limit 10`);
    },
    newest:()=>{
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory where ChuyenMuc1 = CatID and ChuyenMuc2= ChildID and TrangThai = 1 and DATEDIFF(CURDATE(), NgayXuatBan) > 0 order by NgayXuatBan desc limit 10`);
    },
    singleByPostID: postID => {
        return db.load(`select *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat from post, category, childcategory, user where NguoiDang = UID and PostID = '${postID}' and ChuyenMuc1 = CatID and ChuyenMuc2 = ChildID `);
      },
  
    allbycat: (postCat, postID) =>{
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory where ChuyenMuc1 = '${postCat}' and ChuyenMuc1 = CatID and ChuyenMuc2= ChildID  and TrangThai = 1 and PostID not in ('${postID}') and DATEDIFF(CURDATE(), NgayXuatBan) > 0 order by NgayXuatBan desc`)
    },
    pagebycat: (postCat, limit, offset) =>{
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory where ChuyenMuc1 = '${postCat}' and ChuyenMuc1 = CatID and ChuyenMuc2= ChildID and DATEDIFF(CURDATE(), NgayXuatBan) > 0  and TrangThai = 1 order by NgayXuatBan desc limit ${limit} offset ${offset}`)
    },
    countbycat: (postCat) =>{
        return db.load(`select count(*) as total from post where ChuyenMuc1 = '${postCat}'`)
    },
    allbychildcat: postCat=>{
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory where ChuyenMuc2 = '${postCat}' and ChuyenMuc1 = CatID and ChuyenMuc2= ChildID and DATEDIFF(CURDATE(), NgayXuatBan) > 0  and TrangThai = 1 order by NgayXuatBan desc`)
    },
    pagebychildcat: (postCat, limit, offset) =>{
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory where ChuyenMuc2 = '${postCat}' and ChuyenMuc1 = CatID and ChuyenMuc2= ChildID and DATEDIFF(CURDATE(), NgayXuatBan) > 0 and TrangThai = 1 order by NgayXuatBan desc limit ${limit} offset ${offset}`)
    },
    countbychildcat: (postCat) =>{
        return db.load(`select count(*) as total from post where ChuyenMuc2 = '${postCat}'`)
    },
    allbycategory: postCat=>{
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory where ChuyenMuc1 = '${postCat}' and ChuyenMuc1 = CatID and ChuyenMuc2= ChildID  and DATEDIFF(CURDATE(), NgayXuatBan) > 0 and TrangThai = 1 order by NgayXuatBan desc`)
    },
    premiumpost: () => {
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory where ChuyenMuc1 = CatID and ChuyenMuc2= ChildID and Premium = 'Premium' and DATEDIFF(CURDATE(), NgayXuatBan) > 0 and TrangThai = 1 order by NgayXuatBan desc limit 5`);
    },
    choxuatban: () => {
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory where ChuyenMuc1 = CatID and ChuyenMuc2= ChildID and DATEDIFF(CURDATE(), NgayXuatBan) < 0`);
    },
    add: entity =>{
        return db.add('post', entity)
    },
    update: entity => {
        return db.update('post', 'PostID', entity);
      },
    delete: postID=>{
        return db.delete('post', 'PostID', postID);
    },
    writerchoduyet: nguoidang=>{
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory where ChuyenMuc1 = CatID and ChuyenMuc2= ChildID and NguoiDang = '${nguoidang}' and TrangThai = 2`);
    },
    writerxuatban: nguoidang=>{
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory where ChuyenMuc1 = CatID and ChuyenMuc2= ChildID and NguoiDang = '${nguoidang}' and TrangThai = 1`);
    },
    writertuchoi: nguoidang=>{
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory where ChuyenMuc1 = CatID and ChuyenMuc2= ChildID and NguoiDang = '${nguoidang}' and TrangThai = 3`);
    },
    editerchoduyet: (catID)=>{
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory, user where ChuyenMuc1 = '${catID}' and NguoiDang = UID and ChuyenMuc1 = CatID and ChuyenMuc2= ChildID and TrangThai = 2`);
    },
    editerxuatban: (catID)=>{
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory, user where ChuyenMuc1 = '${catID}' and NguoiDang = UID and ChuyenMuc1 = CatID and ChuyenMuc2= ChildID and TrangThai = 1`);
    },
    editertuchoi: (catID)=>{
        return db.load(`SELECT *, DATE_FORMAT(NgayXuatBan, '%d-%m-%Y') NgayXuatBanFormat FROM post , category, childcategory, user where ChuyenMuc1 = '${catID}' and NguoiDang = UID and ChuyenMuc1 = CatID and ChuyenMuc2= ChildID and TrangThai = 3`);
    }
}