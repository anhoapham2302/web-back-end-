var express =  require('express');
var postModel = require('../../models/post.model');

var router = express.Router();
var auth = require('../../middlewares/auth');





router.get('/allpost', auth, (req, res, next) => {
    var id = req.user.UID;
    var catid = req.user.UCateManagement;

      postModel.editerchoduyet(catid).then(rows1=>{
        postModel.editerxuatban(catid).then(rows2=>{
            postModel.editertuchoi(catid).then(rows3=>{
            res.render('editer/dsbaiviet',{post1: rows1, post2:rows2, post3: rows3, layout: 'admin.hbs'})
          })    
         });
        console.log(rows1);
        
      });
  });
  router.get('/edit/:id', auth,(req, res, next) => {
    var id = req.params.id;
    postModel.singleByPostID(id).then(rows=>{
      res.render('editer/duyet-tuchoi', {post: rows, layout:'admin.hbs'})
    })
  });

  router.post('/edit/:id', auth, (req, res, next) => {
    var uid = req.user.UID;
    
    var entity = {
      PostID: req.body.PostID,
        TieuDe: req.body.tieude,
        AnhBia: req.body.anhbia,
        TomTat: req.body.noidungngan,
        //ChuyenMuc1: req.body.category,
        //ChuyenMuc2: req.body.childcategory,
        NguoiDuyet: uid,
        NoiDung: req.body.FullDes,
        TrangThai: 1,
        NgayXuatBan: req.body.ngayxb,
        Premium: 'Normal'
    }
  
   
    console.log(entity);
    
    postModel.update(entity).then(id => {
        res.redirect('/editer/allpost');
    });
  });

  router.post('/tuchoi', auth, (req, res, next) => {
    var uid = req.user.UID;
    
    var entity = {
      PostID: req.body.PostID,
        TieuDe: req.body.tieude,
        AnhBia: req.body.anhbia,
        TomTat: req.body.noidungngan,
        //ChuyenMuc1: req.body.category,
        //ChuyenMuc2: req.body.childcategory,
        NguoiDuyet: null,
        NoiDung: req.body.FullDes,
        TrangThai: 3,
        NgayXuatBan: null,
        Premium: 'Normal'
    }
  
   
    console.log(entity);
    
    postModel.update(entity).then(id => {
        res.redirect('/admin/post/allpost');
    });
  });

module.exports = router;