var express =  require('express');
var categoryModel = require('../../models/category.model');
var userModel = require('../../models/user.model');
var childcategoryModel = require('../../models/childcategory.model');

var router = express.Router();



router.get('/category', (req, res)=> {
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

router.get('/user', (req, res)=> {
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


module.exports = router;