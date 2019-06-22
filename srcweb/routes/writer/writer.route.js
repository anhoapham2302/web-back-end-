var express =  require('express');
var postModel = require('../../models/post.model');

var router = express.Router();
var auth = require('../../middlewares/auth');



router.get('/addpost', auth, (req, res, next) => {
  res.render('writer/dangbai', {layout: 'admin.hbs'});
})

router.post('/addpost', auth, (req, res, next) => {
  var id = req.user.UID;
  
  var entity = {
    
      TieuDe: req.body.tieude,
      AnhBia: req.body.anhbia,
      TomTat: req.body.noidungngan,
      ChuyenMuc1: req.body.category,
      ChuyenMuc2: req.body.childcategory,
      NguoiDang: id,
      NoiDung: req.body.FullDes,
      TrangThai: 2,
      Premium: req.body.type
  }

 
  console.log(entity);
  
  postModel.add(entity).then(id => {
    res.redirect('/writer/allpost');
  });
});

router.get('/allpost', auth, (req, res, next) => {
  var UID = req.user.UID;

  
  postModel.writerchoduyet(UID).then(rows=>{
    postModel.writerxuatban(UID).then(rows2=>{
      postModel.writertuchoi(UID).then(rows3=>{
        res.render('writer/dsbaiviet',{lcChoduyet: rows, xuatban:rows2, tuchoi: rows3, layout: 'admin.hbs'})
      })    
     });
    
  });
})

router.get('/edit/:id', auth,(req, res, next) => {
  var id = req.params.id;
  postModel.singleByPostID(id).then(rows=>{
    res.render('writer/suabai', {post: rows, layout:'admin.hbs'})
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
      NguoiDang: uid,
      NoiDung: req.body.FullDes,
      TrangThai: 2,
      Premium: req.body.type
  }

 
  console.log(entity);
  
  postModel.update(entity).then(id => {
    res.redirect('/writer/allpost');
  });
});


module.exports = router;