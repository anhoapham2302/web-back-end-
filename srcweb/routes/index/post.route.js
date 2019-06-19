var express =  require('express');
var postModel = require('../../models/post.model');

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
    .then(rows=>{
        
        res.render('index/baichitiet',{
            post: rows
        })
    });    
});

router.get('/category/:id', (req, res)=>{
    var id = req.params.id;
    postModel.allbycat(id)
    .then(rows=>{
        
        res.render('index/list-cat',{
            postcat: rows
        })
    });    

});

router.get('/childcategory/:id', (req, res)=>{
    var id = req.params.id;
    postModel.allbychildcat(id)
    .then(rows=>{
        
        res.render('index/list-childcat',{
            postchildcat: rows
        })
    });    

});


module.exports = router;