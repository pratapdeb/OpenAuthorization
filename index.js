const express  = require('express')
const app = express();
const authRoute = require('./routes/auth');
const profileRouter = require('./routes/profile');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const cookieSession = require('cookie-session');
const passport = require('passport');


dotEnv.config();

//cookcie setup
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys:[process.env.cookieKey]
}))

//passport initialize
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine','ejs');
mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log('Connected to MongoDB Atlas');
    
    app.listen(process.env.PORT,()=>console.log("server listening at"+process.env.PORT));
})

//home route
app.use('/auth',authRoute);
app.use('/profile',profileRouter)