//import modules
const express = require("express")
const app = express()
const path = require("path")
const cors = require('cors')

//path from the root/server where the node
//process node exp.js is started.

const { mongoGetAllItems } = require("./resources/linkToDatabase")

//

// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });
app.use(cors())
//index.html route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})
//app.post("todos", (req,res)=>{
//    postTodo(msg)
//})

//main variables
const port = 3000


app.get("/todos", (req, res) => {
    const items = mongoGetAllItems().then(d => res.json(d)).catch(e => console.log(e))
})

app.use(express.static(path.join(__dirname + "/js")))
app.listen(port, () => console.log(`listening at ${port}`))
