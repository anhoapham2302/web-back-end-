var categoryModel = require('../models/category.model');
var childModel = require('../models/childcategory.model');

module.exports = (req, res, next) => {
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

