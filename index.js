//import modules
const express = require("express")
const app = express()
const path = require("path")
//const logger = require("morgan")
const dbcalls = require("./serverJs/dbcalls")

app.use(express.static(path.join(__dirname + "/resources")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "about.html"))
})

//app.use(logger('dev'));
//let pings = 0

app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
 next()})

app.use("/quote", dbcalls)

//main variables
const port = 3000
app.listen(port, () => console.log(`listening at ${port}`))
