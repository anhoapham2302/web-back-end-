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

router.get('/:id', (req, res)=>{
    var id = req.params.id;
    res.locals.cateactive = true;
    postModel.singleByPostID(id)
    .then(rows=>{
        
        res.render('index/baichitiet',{
            post: rows
        })
    });
    
});


module.exports = router;