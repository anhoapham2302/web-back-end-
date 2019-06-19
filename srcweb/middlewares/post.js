var postModel = require('../models/post.model')

module.exports = (req, res, next) => {
var sess = req.session;
postModel.topview1()
.then(rows =>{
    sess.lcPost1 = rows[0];
})
res.locals.lcPost1 = sess.lcPost1;
postModel.all()
.then(rows => {
    res.locals.lcPost = rows;
    next();
});


}

