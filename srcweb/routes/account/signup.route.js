var express =  require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var userModel = require('../../models/user.model');

var router = express.Router();

router.get('/isavailable', (req, res, next)=> {
    var user = req.query.username;
    userModel.singleByUserName(user).then(rows =>
        {
            if(rows.length > 0){
                return res.json(false);
            }
            return res.json(true);
        })
});

router.get('/', (req, res, next)=> {
    res.render('account/sign');
});

router.post('/', (req, res, next)=>{
    var saltRounds = 10;
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    var curdate = moment().format('YYYY-MM-DD');
    var entity ={
        UUsername: req.body.username,
        UPass: hash,
        UName: req.body.name,
        UNick: null,
        UEmail: req.body.email,
        UDOB: dob,
        URole: 4,
        UDateCreate: curdate
    }

    userModel.add(entity).then(id =>{
        res.render('account/sign');
    });
})

router.get('/login', (req, res, next)=> {
    res.end('LOGIN');
});

module.exports = router;