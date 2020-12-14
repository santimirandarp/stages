// the server contains 3 main blocks. 
// * Login/register
// * Home/About pages
// Application pages (where there are calls to DB)

//-------------------//

// load config from .env
require("dotenv").config()

const express = require("express")
const app = express()
const session =  require("express-session")
const path = require("path")//utility
const logger = require('morgan');
const helmet = require("helmet")
const DBrequests = require("./serverJs/db/requests")
const loginController = require("./serverJs/db/users")
const exphbs = require("express-handlebars")
const  { devServer, prodServer } = require("./serverJs/servers") 
const { SECRET, PROD, DEV } = process.env

app.use(session({
	secret: SECRET,
	resave: true,
	saveUninitialized: false,
  cookie:{ sameSite: false }
}));
app.use(logger("dev"))
//app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(helmet());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', 'resources/views')

const base = "/resources"
const paths = {
  html:`${base}/html`, 
  css:`${base}/css`, 
  js:`${base}/js`
}
app.use(express.static(path.join(__dirname + paths.html)))
app.use(express.static(path.join(__dirname + paths.css)))
app.use(express.static(path.join(__dirname + paths.js)))
app.use(express.static(path.join(__dirname + base)))


app.get("/", (req, res) => {
  req.session.loggedIn ?
    res.sendFile(path.join(__dirname, "index.html")):
    res.status(301).redirect("/login")
})

app.get("/login", (req, res) => {
  req.session.loggedIn ?
    res.status(301).redirect("/"):
    res.render("login", {
     title:"Login",
     formId:"login",
     link:{
       par:"New user? Register!", 
       href: "register",
       text:"Register"
     }

    })
})

app.get("register", (req, res) => {
  req.session.loggedIn ?
    res.status(301).redirect("/"):
    res.render("register", {
     title:"Registration",
     formId:"register",
     link:{
       par:"Registered? Log In!", 
       href: "login",
       text:"Login"
     }})

})

app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
 next()
})

//routes
//app.use("/todos", todosHandler) 
app.use("/users", loginController) 
app.use("/quote", DBrequests)

//run dev server
//PROD=="true" ? prodServer(): devServer()
app.get("/logout", (req, res) => {
req.session.destroy(() => res.redirect("/"))
})
app.get("*", (req, res) => {
    res
    .status(404)
    .sendFile(path.join(__dirname, paths.html, "/404.html"))
})

app.listen(3000)

