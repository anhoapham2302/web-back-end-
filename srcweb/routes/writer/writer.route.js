var express =  require('express');
var categoryModel = require('../../models/category.model');
var userModel = require('../../models/user.model');
var childcategoryModel = require('../../models/childcategory.model');
var postModel = require('../../models/post.model');

var router = express.Router();
var auth = require('../../middlewares/auth');


router.get('/', (req, res)=> {

        res.render('admin/viewCategory/category', {
            layout: 'writer.hbs'
        })
});

router.get('/addpost', (req, res, next) => {
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
      Premium: 'Normal'
  }

  console.log(entity);
  
  postModel.add(entity).then(id => {
    res.end('xong');
    //  res.redirect('/admin/writer/list-post');
 // }).catch(err => {
 //     console.log(err);
   //   res.end('error');
  });
})

router.get('/upload', (req, res, next) => {
  res.render('vwDemo/upload');
})

module.exports = router;


module.exports = router;