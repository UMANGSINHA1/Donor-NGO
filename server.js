const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Donordb = require("./server/model/model");
const NGOdb = require("./server/model/model");

const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
const connectDB = require("./server/database/connection");
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

// app.use(bodyParser());
//mongodb connection
// connectDB();
// app.use(express.urlencoded({ extended: true }));


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/userDB');
}

const userSchema = new mongoose.Schema({
  email: String, 
  password: String,
  phone: String
});

const ngoSchema = new mongoose.Schema({
  email: String, 
  password: String
});

userSchema.plugin(passportLocalMongoose);
ngoSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

const NGO = new mongoose.model("NGO", ngoSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(NGO.createStrategy());

passport.serializeUser(NGO.serializeUser());
passport.deserializeUser(NGO.deserializeUser());



// app.use(express.json());
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", function (req, res) {
  res.render("login");
});
app.get("/NGOlogin", function (req, res) {
  res.render("NGOlogin");
});
app.get("/signup", function (req, res) {
  res.render("signup");
});
app.get("/NGOsignup", function (req, res) {
  res.render("NGOsignup");
});

// app.get("/api/users", function (req, res) {
//   res.render("index", { users: response.data });
// });

// get route for homepage to be shown after login
app.get("/home", async (req, res) => {
  if(req.isAuthenticated){
    res.render("home");
  }
  else{
    req.redirect("/login");
  }
});

app.post("/signup", function(req, res){
  User.register ({username: req.body.username}, req.body.password, function(err, user){
    if(err){
      console.log(err);
      res.redirect("/signup");
    }
    else{
      passport.authenticate("local")(req,res,function(){
        res.redirect("/home");
      })
    }
  } 
  })
});


app.post("/NGOsignup", function(req, res){
  NGO.register({username: req.body.username}, req.body.password, function(err, user){
    if(err){
      console.log(err);
      res.redirect("/NGOsignup");
    }
    else{
      passport.authenticate("local")(req,res,function(){
        res.redirect("/home");
      })
    }
  })
})

app.post("/NGOlogin", function(req, res){
  const ngo = new NGO({
    username: req.body.username,
    password: req.body.password
  })
  req.login(ngo, function(err) {
    if (err) { console.log(err); }
    else{
      passport.authenticate("local")(req,res,function(){
        res.redirect("/home");
      })
    }
  });
})

app.listen(3000, () => {
  console.log("server running on port 3000");
});
