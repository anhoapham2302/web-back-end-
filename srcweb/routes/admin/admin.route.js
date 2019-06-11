var express =  require('express');
var categoryModel = require('../../models/category.model');

var router = express.Router();



router.get('/', (req, res)=> {
    res.render('admin/viewCategory/index', {layout: 'admin.hbs'});
});


module.exports = router;