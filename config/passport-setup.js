const passport  = require('passport');
const GoogleStrategy   = require('passport-google-oauth20');
const dotEnv =  require('dotenv');
const User   = require('../models/user');


//serializing user

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((id,done)=>{

    User.findById(id).then((currUser)=>{
        done(null,currUser);
    })
})

dotEnv.config();
//setup
passport.use(new GoogleStrategy({
    //options for google strat
    callbackURL:'/auth/google/redirect',
    clientID:process.env.clientID,
    clientSecret:process.env.clientSecret
},(accessToken,refreshToken,profile,done)=>{
    //passport callback function
    console.log(profile.id,profile.displayName);
    
    //check user already exists
    User.findOne({googleID:profile.id}).then((userExists)=>{
        if(userExists){
            //user already exists
            done(null,userExists)
        }
        else{//user doesn't exists
            new User({
                username  : profile.displayName,
                googleID  : profile.id
            }).save().then((newUser)=>{
                console.log(`new user created ${newUser}`);
                done(null,userExists)
            })
        }
    })

}))