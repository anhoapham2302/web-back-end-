var express = require('express');
var exphbs = require('express-handlebars');
var morgan = require('morgan');
var app = express();

app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());
app.use(morgan('dev'));

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts'
}));
app.set('view engine', 'hbs');

app.get('/home', (req, res) => {
    res.render('home');
});


app.use('/admin/categories', require('./routes/admin/admin.route'));

app.listen(3000, () => {
    console.log('Web server http://localhost:3000');
    
})
