// the server contains 3 main blocks. 
// * Login/register
// * Home/About pages
// Application pages (where there are calls to DB)

//-------------------//

// load config from .env
const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const app = express()
const session =  require("express-session")
const path = require("path")//utility

const helmet = require("helmet")
const router = require("./serverJs/db/requests")

const  { 
  devServer, 
  prodServer 
} = require("./serverJs/servers")

const { SECRET, PROD, DEV } = process.env

app.use(session({
	secret: SECRET,
  loggedIn:false,
	resave: true,
	saveUninitialized: true,
  cookie:{ sameSite: false }
}));

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(helmet());

app.use(express.static(path.join(__dirname + "/resources/html")))
app.use(express.static(path.join(__dirname + "/resources/css")))
app.use(express.static(path.join(__dirname + "/resources")))


app.get("/", (req, res) => {
  req.session.loggedIn ?
    res.sendFile(path.join(__dirname, "index.html")):
    res.status(301).redirect("/login")
})


app.get("/login|register/", (req, res) => {
  req.session.loggedIn ?
    res.status(301).redirect("/"):
    res.sendFile(path.join(__dirname, /login|register/ + ".html"))
})

app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
 next()
})

app.post("login", (req, res) => {

})

app.use("/quote", router)

//run dev server
PROD=="true" ? prodServer(): devServer()
