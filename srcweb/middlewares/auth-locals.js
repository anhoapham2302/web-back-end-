module.exports = (req, res, next) => {
    if (req.user) {
      res.locals.isAuthenticated = true;
      res.locals.authUser = req.user;
      if(req.user.URole == 1 || req.user.URole == 2 || req.user.URole == 3)
      {
          res.locals.isQuanly = true;
      }
      if(req.user.URole == 1)
      {
          res.locals.isAdmin = true;
      }   
    }

    next();
  }