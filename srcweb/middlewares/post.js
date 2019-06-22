var postModel = require('../models/post.model')

module.exports = (req, res, next) => {
var sess = req.session;
postModel.top3()
.then(rows =>{
    sess.lcPost1 = rows[0];
    sess.lcPost2 = rows[1];
    sess.lcPost3 = rows[2];
})
res.locals.lcPost1 = sess.lcPost1;
res.locals.lcPost2 = sess.lcPost2;
res.locals.lcPost3 = sess.lcPost3;
postModel.top()
.then(rows => {
    res.locals.lcTopPost = rows;
});
postModel.premiumpost()
.then(rows => {
    res.locals.lcPremium = rows;
});
postModel.newest()
.then(rows => {
    res.locals.lcPost = rows;
    next();
});


}

