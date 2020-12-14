const express = require("express")
const app = express()
const path = require("path")

const dbcalls = require("./serverJs/dbcalls")
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname + "/resources/html")))
app.use(express.static(path.join(__dirname + "/resources/css/")))
app.use(express.static(path.join(__dirname + "/resources")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
 next()
})

app.use("/quote", dbcalls)

app.listen(port, () => console.log(`listening at ${port}`))
