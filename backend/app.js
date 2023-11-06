const express = require('express')
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const passport = require('passport')
const { Strategy } = require('passport-facebook')
const session = require("express-session")
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
};
app.use(express.static('backend/public'));
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir: '/tmp/',
  createParentPath: true,
}))
app.use(passport.initialize())
// app.use(passport.session())
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));
passport.serializeUser(function (user, cb) { 
  cb(null, user)
})
passport.deserializeUser(function (obj, cb) { 
  cb(null, obj)
})


passport.use(new Strategy({
  clientID: 3513405555637352,
  clientSecret: '1d4f8324cc22cd3c9c7dfd55464f5adc',
  callbackURL: "http://localhost:4000/auth/facebook/callback",
  profileFields: ['emails', 'name', 'displayName', 'gender', 'profileUrl', 'photos', 'friends']
},
  async function (accessToken, refreshToken, profile, cb) {
    const socialMediaAuth = await SocialMediaAuth.find({
      provider: 'facebook',
      subject: profile.id,
    })
    console.log(socialMediaAuth);
    if (socialMediaAuth.length > 0) {
      return cb(null, profile);
    } else {
      const user = await userModel.create({
        name: profile.displayName,
        email: `${profile.displayName}@gmail.com`,
        password: `${profile.displayName}@facebook.com`,
        avatar: {
          public_id: '',
          url: 'http://google.com',
        },
      })

      await SocialMediaAuth.create({
        provider: 'facebook',
        subject: profile.id,
        userId: user._id
      })
      return cb(null, profile);
    }
}
));

app.use('/failed/login', (req, res, next) => { 
  res.send('login failed');
})
app.use('/login/fb', passport.authenticate('facebook', {authType: 'reauthenticate', scope: ['email']}))
app.use('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/failed/login' }), (req, res, next) => {
  console.log(req.user);
  res.send(`logged in to facebook${JSON.stringify(req.user)}`, )
 })

app.use('/logout/fb', (req, res, next) => { 
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  })
  res.send('user is logged out')
})

// routes import
const order = require('./routes/orderRoute')
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const SocialMediaAuth = require('./models/socialMediaAuth')
const userModel = require('./models/userModel')

app.use('/api/v1', product)
app.use('/api/v1', user)
app.use('/api/v1', order)

// middleware for error handling
app.use(errorMiddleware)

module.exports = app
