var express = require('express');
var exphbs = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');
var morgan = require('morgan');
var app = express();

app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());
app.use(morgan('dev'));

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts',
    helpers: {
        section: hbs_sections()
    }
}));
app.set('view engine', 'hbs');
app.use(require('./middlewares/locals.mdw'));
app.use(require('./middlewares/post'));

app.get('/home', (req, res) => {
    res.render('home');
});


app.use('/admin', require('./routes/admin/admin.route'));
app.use('/signup', require('./routes/account/signup.route'));
app.use('/post', require('./routes/index/post.route'));



app.listen(3000, () => {
    console.log('Web server http://localhost:3000');
    
})
