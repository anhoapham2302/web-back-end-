var express =  require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport = require('passport');
var userModel = require('../../models/user.model');
var auth = require('../../middlewares/auth');

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

router.get('/signup', (req, res, next)=> {
    res.render('account/sign');
});

router.post('/signup', (req, res, next)=>{
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
        res.redirect('account/login');
    });
})

router.get('/login', (req, res, next)=> {
    res.render('account/login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err)
        return next(err);
  
      if (!user) {
        return res.render('account/login', {

          err_message: info.message
        })
      }
  
      req.logIn(user, err => {
        if (err)
          return next(err);
  
        return res.redirect('/home');
  
        
      });
    })(req, res, next);
   
  })
  
  router.get('/profile', auth, (req, res, next)=>{
      res.render('account/profile');
  })

  router.post('/logout',auth, (req, res, next)=>{
      req.logOut();
      res.redirect('/account/login');
  })

module.exports = router;