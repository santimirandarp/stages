const express = require("express")
const app = express()
const path = require("path")

const dbcalls = require("./serverJs/dbcalls")
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname + "/resources")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "about.html"))
})

//let pings = 0
//appends to response header, to any type /quote request
app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
 next()
})

app.use("/quote", dbcalls)

app.listen(port, () => console.log(`listening at ${port}`))
