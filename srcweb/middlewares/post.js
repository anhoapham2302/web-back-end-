var postModel = require('../models/post.model')

module.exports = (req, res, next) => {
postModel.all()
.then(rows => {
    res.locals.lcPost = rows;
    next();
})

}

