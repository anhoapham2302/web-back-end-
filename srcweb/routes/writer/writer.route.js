var express =  require('express');
var categoryModel = require('../../models/category.model');
var userModel = require('../../models/user.model');
var childcategoryModel = require('../../models/childcategory.model');

var router = express.Router();
var auth = require('../../middlewares/auth');


router.get('/', (req, res)=> {

        res.render('admin/viewCategory/category', {
            layout: 'writer.hbs'
        })
});




module.exports = router;