//'esversion:6'
//import modules
const dotenv = require("dotenv")
const express = require("express")
const app = express()
const path = require("path")
const {
    MongoClient
} = require("mongodb")
const cors = require('cors')
dotenv.config({
    path: './resources/.env'
})
app.use(cors())
//index.html route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})
//app.post("todos", (req,res)=>{
//    postTodo(msg)
//})
//main variables
const {
    DBUSER,
    PASS,
    CLUSTER_ID
} = process.env
const uri = `mongodb+srv://${DBUSER}:${PASS}@${CLUSTER_ID}.mongodb.net/todos?authSource=admin`
const port = 3000
console.log(uri)
async function callDB() {
    let result
    try {
        const call = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        result = await call.db("todos").collection("items").find({}).toArray()
    } catch (e) {
        console.log(e)
        throw e
    }
    return result
}
app.get("/todos", cors(), (req, res) => {
    const items = callDB().then(d => res.json(d)).catch(e => console.log(e))
})
app.use(express.static(path.join(__dirname + "/js")))
app.listen(port, () => console.log(`listening at ${port}`))
