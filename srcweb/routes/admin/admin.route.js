var express =  require('express');
var categoryModel = require('../../models/category.model');
var userModel = require('../../models/user.model');
var childcategoryModel = require('../../models/childcategory.model');

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


  
router.post('/category/update', (req, res) => {
    categoryModel.update(req.body)
      .then(n => {
        res.redirect('/admin/category');
      }).catch(err => {
        console.log(err);
      })
      
  });
  
  router.post('/childcategory/update', (req, res) => {
    childcategoryModel.update(req.body)
      .then(n => {
        res.redirect('/admin/category');
      }).catch(err => {
        console.log(err);
      })
     
      
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

router.get('/category/add', (req, res) => {
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
  
  router.post('/childcategory/delete/:id', (req, res) => {
    var id = req.params.id;
    childcategoryModel.delete(id)
      .then(n => {
        res.redirect('/admin/category');
      }).catch(err => {
        console.log(err);
      })
  })
  


module.exports = router;