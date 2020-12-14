//import modules
const express = require("express")
const app = express()
const path = require("path")
const cors = require('cors')

//path from the root/server where the node
//process node exp.js is started.

app.use(cors())
app.use(express.static("resources"))
//

// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });
//index.html route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})
//app.post("todos", (req,res)=>{
//    postTodo(msg)
//})

//main variables
const port = 2000

app.listen(port, () => console.log(`listening at ${port}`))

