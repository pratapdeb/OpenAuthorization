const router = require('express').Router();



const authCheck = (req, res, next) => {

    if (req.user) next();
    else res.redirect('/auth/login');

}
router.use('/', (req, res, next) => {

    res.render('profile',{user:req.user});
})

module.exports = router;