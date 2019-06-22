var express = require('express');
var morgan = require('morgan');
var app = express();
var auth = require('./middlewares/auth');

app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());
app.use(morgan('dev'));

require('./middlewares/view-engine')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app);

app.use(require('./middlewares/auth-locals'));
app.use(require('./middlewares/locals.mdw'));
app.use(require('./middlewares/post'));

app.get('/home', (req, res) => {
    res.render('home');
});


app.use('/admin', require('./routes/admin/admin.route'));
app.use('/writer', require('./routes/writer/writer.route'));
app.use('/editer', require('./routes/editer/editer.route'));
app.use('/account', require('./routes/account/signup.route'));
app.use('/post', require('./routes/index/post.route'));



app.listen(3000, () => {
    console.log('Web server http://localhost:3000');
    
})
