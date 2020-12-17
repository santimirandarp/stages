// the server contains 3 main blocks. 
// * Login/register
// * Home/About pages
// Application pages (where there are calls to DB)

//-------------------//

require("dotenv").config()
const express = require("express")
const app = express() //app object

const session =  require("express-session") //stores in req.session
const path = require("path")
const logger = require('morgan') //dev tool
const helmet = require("helmet")// improves headers
const exphbs = require("express-handlebars")//to write less html

//own stuff
const DBrequests = require("./serverJs/db/requests")
const crudUsers = require("./serverJs/db/users")
const  { devServer, prodServer } = require("./serverJs/servers") 
const { SECRET, NODE_ENV} = process.env


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
app.use(logger("dev"))
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
     res.redirect(303, "/users/login") 
   })

// more specific middlewares
app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
 next()
})
app.use(express.urlencoded({extended : false}));
app.use(express.json());
//routes
//app.use("/todos", todosHandler) 

app.use("/users", crudUsers) 
app.use("/quote", DBrequests)

app.get("*", (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.status(404)
    res.write('<h1 style="text-align:center, font-family:sans-serif">404: Page Not Found</h1>')
    res.end()
})

app.listen(3000)

