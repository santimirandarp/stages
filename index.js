// the server contains 3 main blocks. 
// * Login/register
// * Home/About pages
// Application pages (where there are calls to DB)

//-------------------//

require("dotenv").config()

const express = require("express")
const app = express() //main object

const session =  require("express-session")//stores in req.session
const path = require("path")//utility
const logger = require('morgan'); //dev tool
const helmet = require("helmet")
const DBrequests = require("./serverJs/db/requests")
const loginController = require("./serverJs/db/users")
const exphbs = require("express-handlebars")
const  { devServer, prodServer } = require("./serverJs/servers") 
const { SECRET, NODE_ENV} = process.env

app.use(session({
	secret: SECRET,//recommended array pushing new string daily
  //will keep the same for now
	resave: false, //typically you want false (docs)
	saveUninitialized: false,
  cookie: NODE_ENV === "production" ? { 
    sameSite:true, 
    secure:true 
  }:{ 
    sameSite: false,
    secure: false 
  }
}));
app.use(logger("dev"))
//app.use(express.urlencoded({extended : true}));
app.use(express.json());
//app.use(helmet());

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
  if (req.session.loggedIn){
      res.sendFile(path.join(__dirname, "index.html"))
    } else{ res.redirect(301, "/login") }
})

app.get("/login", (req, res) => {
  req.session.loggedIn ?
    res.redirect(301, "/"):
    res.render("users", {
     title:"Login",
     formId:"login",
     link:{
       par:"New user?", 
       href: "register",
       text:" Register"
     }

    })
})

app.get("/register", (req, res) => {
  req.session.loggedIn ?
    res.redirect(301, "/"):
    res.render("users", {
     title:"Registration",
     formId:"register",
     link:{
       par:"Registered?", 
       href: "login",
       text:" Login"
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
console.log(req.session.views)
req.session.destroy((err) => {
  if(!err){
  console.log("views after session destroyed", req.session.views)
  res.redirect(301, "/")
  } else{console.log(err)}
})
})

app.get("*", (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.status(404)
    res.write('<h1 style="text-align:center, font-family:sans-serif">404: Page Not Found</h1>')
    res.end()
})

app.listen(3000)

