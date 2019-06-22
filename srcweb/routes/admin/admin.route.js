var express =  require('express');
var categoryModel = require('../../models/category.model');
var userModel = require('../../models/user.model');
var childcategoryModel = require('../../models/childcategory.model');
var tagModel = require('../../models/tag.model');
var postModel = require('../../models/post.model');

var router = express.Router();
var auth = require('../../middlewares/auth');

router.get('/dashboard',(req, res)=>{
    res.end("Thống kê");
})

router.get('/category', auth, (req, res)=> {
    var p = categoryModel.all();
    res.locals.cateactive = true;
    p.then(rows => {
        res.render('admin/viewCategory/category', {
            category: rows,
            layout: 'admin.hbs'
        })
    })
    .catch(err=>{
        console.log(err);
    });
   
});

router.get('/user',auth, (req, res)=> {
    var p = userModel.all();
    res.locals.useractive = true;
    p.then(rows => {
        res.render('admin/viewCategory/user', {
            category: rows,
            layout: 'admin.hbs'
        })
    })
    .catch(err=>{
        console.log(err);
    });

   
});

router.get('/post/all',auth, (req, res)=> {
  var p = postModel.all();
  res.locals.postactive = true;
  p.then(rows => {
      res.render('admin/viewCategory/postall', {
          post: rows,
          layout: 'admin.hbs'
      })
      
  })
  .catch(err=>{
      console.log(err);
  });
});
router.get('/post/premium',auth, (req, res)=> {
  var p = postModel.premiumpost();
  res.locals.postactive = true;
  p.then(rows => {
      res.render('admin/viewCategory/postpremium', {
          post: rows,
          layout: 'admin.hbs'
      })
      
  })
  .catch(err=>{
      console.log(err);
  });
});

router.get('/post/choxuatban',auth, (req, res)=> {
  var p = postModel.choxuatban();
  res.locals.postactive = true;
  p.then(rows => {
      res.render('admin/viewCategory/choxuatban', {
          post: rows,
          layout: 'admin.hbs'
      })
      
  })
  .catch(err=>{
      console.log(err);
  });
});


router.get('/category/:id/childcategory', (req, res)=>{
    var id = req.params.id;
    res.locals.cateactive = true;
    childcategoryModel.allbycat(id)
    .then(rows=>{
        
        res.render('admin/viewCategory/child',{
            child: rows,
            layout: 'admin.hbs'
        })
    });
    
});

router.get('/tag/edit/:id', (req, res) => {
    var id = req.params.id;
    res.locals.tagactive = true;
    tagModel.single(id).then(rows => {
        res.render('admin/viewCategory/edit-tags', {
          tag: rows[0],
          layout: 'admin.hbs'
        });
        console.log(rows);
        
    }).catch(err => {
      console.log(err);
    });
  });

  router.get('/childcategory/edit/:id', (req, res) => {
    var id = req.params.id;
    res.locals.cateactive = true;
    childcategoryModel.single(id).then(rows => {
        res.render('admin/viewCategory/edit-childcat', {
          child: rows[0],
          layout: 'admin.hbs'
        });
        console.log(rows);
        
    }).catch(err => {
      console.log(err);
    });
  }) 
  
  
router.post('/category/update', (req, res) => {
  res.locals.cateactive = true;
    categoryModel.update(req.body)
      .then(n => {
        res.redirect('/admin/category');
      }).catch(err => {
        console.log(err);
      })
      
  });
  
  router.post('/childcategory/update', (req, res) => {
    res.locals.cateactive = true;
    childcategoryModel.update(req.body)
      .then(n => {
        res.redirect('/admin/category');
      }).catch(err => {
        console.log(err);
      })
     
      
  });
  
  

router.get('/category/add', (req, res) => {
  res.locals.cateactive = true;
    res.render('admin/viewCategory/add',{layout: 'admin.hbs'});
  })
  
router.post('/category/add', (req, res) => {
    categoryModel.add(req.body)
      .then(id => {
        console.log(id);
        res.render('admin/viewCategory/add', {layout: 'admin.hbs'});
      }).catch(err => {
        console.log(err);
      })
  });
  
  router.post('/childcategory/add', (req, res) => {
    childcategoryModel.add(req.body)
      .then(n => {
        res.redirect('/admin/category');
      }).catch(err => {
        console.log(err);
      })     
  });

  router.post('/category/delete', (req, res) => {
    categoryModel.delete(req.body.CatID)
      .then(n => {
        res.redirect('/admin/category');
      }).catch(err => {
        console.log(err);
      })
  });
  
  router.post('/childcategory/delete', (req, res) => {
    childcategoryModel.delete(req.body.ChildID)
      .then(n => {
        res.redirect('/admin/category');
      }).catch(err => {
        console.log(err);
      })
  });

  router.get('/tag', auth, (req, res)=> {
    var p = tagModel.all();
    res.locals.tagactive = true;
    p.then(rows => {
        res.render('admin/viewCategory/tag', {
            tag: rows,
            layout: 'admin.hbs'
        })
    })
    .catch(err=>{
        console.log(err);
    });
   
});

router.post('/tag/delete', (req, res) => {
  
    tagModel.delete(req.body.TagID)
      .then(n => {
        res.redirect('/admin/tag');
      }).catch(err => {
        console.log(err);
      })
  });
  
  router.post('/tag/update', (req, res) => {
    tagModel.update(req.body)
      .then(n => {
        res.redirect('/admin/tag');
      }).catch(err => {
        console.log(err);
      })
      
  });
  
  router.post('/tag/add', (req, res) => {
    tagModel.add(req.body)
      .then(n => {
        res.redirect('/admin/tag');
      }).catch(err => {
        console.log(err);
      })     
  });

  router.get('/user/:id@:role',auth, (req, res)=>{
    res.locals.useractive = true;
    var id = req.params.id;    
    var role = req.params.role;
    if(role == 1)
    {
      res.locals.isAdminProfile = true;
    }
    if(role == 2)
    {
      res.locals.isEditerProfile = true;
    }
    if(role == 3)
    {
      res.locals.isWriterProfile = true;
    }
    if(role == 4)
    {
      res.locals.isUserProfile = true;
    }
    userModel.single(id)
    .then(rows=>{    
      res.render('admin/viewCategory/chitet-user', {
        user: rows[0],
        layout: 'admin.hbs'
      })    
    }).catch(err => {
      console.log(err);
    })    
  })

  router.get('/post/edit/:id@:type@:status', auth,(req, res, next) => {
    var id = req.params.id;
    var status = req.params.status;
    var type = req.params.type;
    console.log(status);
    
    
    if(status == 1) 
    {
      postModel.singleByPostID(id).then(rows=>{
        res.render('admin/viewCategory/xoabai', {post: rows, layout:'admin.hbs'})
      })
    };
    if(status == 2) 
    {
      postModel.singleByPostID(id).then(rows=>{
        res.render('admin/viewCategory/adminduyet-tuchoi', {post: rows, layout:'admin.hbs'})
      })
    };
    if(status == 5) 
    {
      postModel.singleByPostID(id).then(rows=>{
        res.render('admin/viewCategory/admindoingayxb', {post: rows, layout:'admin.hbs'})
      })
    };
    
    console.log(res.locals.ChoDuyet);
    

   
  });

  router.post('/post/edit/:id@:type@:status', auth, (req, res, next) => {
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
      res.redirect('/admin/post/allpost');
  });
  })

  router.post('/post/tuchoi', auth, (req, res, next) => {
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
        TrangThai: 3,
        NgayXuatBan: null,
        Premium: 'Normal'
    }
  
   
    console.log(entity);
    
    postModel.update(entity).then(id => {
      res.redirect('/admin/post/allpost');
    });
  });

  router.post('/post/delete', auth, (req, res, next) => {
    
    
    postModel.delete(req.body.PostID).then(id => {
      res.redirect('/admin/post/allpost');
    });
  });

  

module.exports = router;