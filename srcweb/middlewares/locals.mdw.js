var categoryModel = require('../models/category.model');
var childModel = require('../models/childcategory.model');
var tagModel = require('../models/tag.model');

module.exports = (req, res, next) => {
    tagModel.all().then(rows=>{
        res.locals.tag = rows;
    });
    childModel.all().then(rows=>{
        res.locals.childs = rows;
    });
    categoryModel.all()
    .then(rows =>{rows.forEach(element => {
        childModel.allbycat(element.CatID).then(rows2=>{
     
           element.child = rows2;
            res.locals.child = rows2;
        })          
         
    });
    res.locals.parents = rows;  
    next();
});
}

