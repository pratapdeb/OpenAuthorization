const router =  require('express').Router();
const passport = require('passport');
const User = require('../models/user');
router.get('/login',(req,res,next)=>{
    res.render('login')
 })

 router.get('/google',passport.authenticate('google',{
     scope:['profile']
 }))
 router.get('/logout',(req,res,next)=>{

    //hangle with passport 
res.send('logging out');

 })

router.get('/home',(req,res,next)=>{
    res.render('home')
})


router.get('/google/redirect',passport.authenticate('google'),(req,res,next)=>{

    //res.send(req.user); 
    res.redirect('/profile');


})

 module.exports =  router;