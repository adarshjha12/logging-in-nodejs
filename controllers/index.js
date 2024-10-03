exports.getIndexpage = function (req, res) {
    if (req.isAuthenticated()) {
        res.render('index')
      } else {
        res.redirect('/login');
      } 
    }