// server contains 3 blocks. 
// * Login
// * Home/About pages
// * Application pages (w calls to DB)

//-------------------//

require("dotenv").config()
const { SECRET, PEM_KEY, PEM_CERT, NODE_ENV } = process.env

const express = require("express")
const app = express() //app object

const session =  require("express-session") //stores in req.session
const path = require("path")
const logger = require('morgan') //dev tool
const helmet = require("helmet")// improves headers
const exphbs = require("express-handlebars")//to write less html
if( NODE_ENV==="production" ){
  var https = require("https")
  var fs = require("fs")
}

const mongoAppRequest = require("./db/requests")
const mongoCrudUser = require("./db/users")

NODE_ENV!=="production" && app.use(logger("dev"))

//
// MiddleWares
app.use(session({
  secret: SECRET,
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

app.use(helmet());

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', 'resources/views')

const base = "/resources"
const paths = {
  html:`${base}/html`, 
  css:`${base}/css`, 
  js:`${base}/js`
}

app.use(express.static(path.join(__dirname + paths.css)))
app.use(express.static(path.join(__dirname + paths.js)))
app.use(express.static(path.join(__dirname + base)))

const props = (user, styleDir) => ({
  username: user||"user",
  stylesheet: "/"+styleDir+"/index"
})

const setRedirect = (req, res, view, styleDir) => {
  const path = req.path;
  const {loggedIn, username} = req.session
  if(loggedIn){
    res.render(view, props(username, styleDir))
  } else {res.redirect(303, "/users/login")}
}

app.get("/", (req, res) => {
  setRedirect(req, res, "index", "home")
})
app.get("/library", (req, res) => {
  setRedirect(req, res, "library", "library")
})
app.get("/about", (req, res) => {
  setRedirect(req, res, "about", "about")
})
// +MIDDLEWARES
app.use(function (req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  next()
})

app.use(express.urlencoded({extended : false}));
app.use(express.json());

// ROUTES
// app.use("/todos", todosHandler) 
app.use("/users",  mongoCrudUser) 
app.use("/quote", mongoAppRequest)

// Rest 
app.get("*", (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.status(404)
  res.write('<h1 style="text-align:center, font-family:sans-serif">404: Page Not Found</h1>')
  res.end()
})


//server
if (NODE_ENV==="production"){
  const httpsServer = https.createServer({
    key: fs.readFileSync(PEM_KEY),
    cert: fs.readFileSync(PEM_CERT)
  }, app);
  httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
  }) 
} else { 
  const port = 3000 
  app.listen( process.env.PORT || port, 
    () => console.log(`listening at ${port}`)) 
}


