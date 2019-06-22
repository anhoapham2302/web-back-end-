var express =  require('express');
var postModel = require('../../models/post.model');
var tagModel = require('../../models/tag.model');

var router = express.Router();



router.get('/', (req, res, next)=> {
    var p = postModel.all();
    p.then(rows => {
        res.render('index/baichitiet', {
            post: rows
        })
    })
    .catch(err=>{
        console.log(err);
    });
});

router.get('/view/:id', (req, res)=>{
    var id = req.params.id;
    postModel.singleByPostID(id)
    .then(rows=>{rows.forEach(element => {
        postModel.allbycat(element.CatID, element.PostID).then(rows2 =>{
            
            res.render('index/baichitiet',{
                post: rows,          
                lcallbycat : rows2
            })
            
        })
    });
        
      
    }) .catch(err=>{
        console.log(err);
    });    
});

router.get('/category/:id', (req, res,next)=>{
    var id = req.params.id;
   var page = req.query.page || 1;
   if (page < 1) page = 1;
    var limit = 3;
    var offset = (page - 1)*limit;
      
  Promise.all([
    postModel.countbycat(id),
    postModel.pagebycat(id, limit, offset)
  ]).then(([count_rows, rows]) => {
    var pages = [];
    var total = count_rows[0].total;
  console.log(total);
  
    
    var nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;
    for (i = 1; i <= nPages; i++) {
      var active = false;
      if (+page === i) active = true;

      var obj = {
        value: i,
        active
      }
      pages.push(obj);
    }

    res.render('index/list-cat', {
      postcat: rows,
      pages
    });
    
  }).catch(next);


});

router.get('/childcategory/:id', (req, res, next)=>{
    var id = req.params.id;
    var page = req.query.page || 1;
    if (page < 1) page = 1;
     var limit = 3;
     var offset = (page - 1)*limit;
       
   Promise.all([
     postModel.countbychildcat(id),
     postModel.pagebychildcat(id, limit, offset)
   ]).then(([count_rows, rows]) => {
     var pages = [];
     var total = count_rows[0].total;
   
     
     var nPages = Math.floor(total / limit);
     if (total % limit > 0) nPages++;
     for (i = 1; i <= nPages; i++) {
       var active = false;
       if (+page === i) active = true;
 
       var obj = {
         value: i,
         active
       }
       pages.push(obj);
     }
 
     res.render('index/list-childcat', {
       postchildcat: rows,
       pages
     });
     
   }).catch(next);
 

});

router.get('/tag/:id', (req, res,next)=>{
    var id = req.params.id;
   var page = req.query.page || 1;
   if (page < 1) page = 1;
    var limit = 3;
    var offset = (page - 1)*limit;
      
  Promise.all([
    tagModel.countbytag(id),
    tagModel.pagebytag(id, limit, offset)
  ]).then(([count_rows, rows]) => {
    var pages = [];
    var total = count_rows[0].total;
  console.log(total);
  
    
    var nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;
    for (i = 1; i <= nPages; i++) {
      var active = false;
      if (+page === i) active = true;

      var obj = {
        value: i,
        active
      }
      pages.push(obj);
    }

    res.render('index/list-tag', {
      postcat: rows,
      pages
    });
    
  }).catch(next);


});


module.exports = router;