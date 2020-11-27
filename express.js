//import modules
const express = require("express")
const app = express()
const path = require("path")
const cors = require('cors')

app.use(express.static(path.join(__dirname + "/resources")))
//path from the root/server where the node
//process node exp.js is started.

const { mongoGetNItems } = require("./resources/linkToDatabase")

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

function defineMongoQuery(key, select){
  const project ={"$project":{"_id":0, "quote":1} } 
  if (key==="asdfgh"){
    if(select=="sample"){
     return [{"$sample":{"size":5}}, project ]
    } else { return [project] }}
  else if (key!=="asdfgh"){
    let reg = new RegExp(key, 'i') 
    console.log(reg)
    const userText= { "$match":{"quote":{ "$regex": reg }
}}
      if(select==="sample"){
       return [userText,{"$sample":{"size":5}}, project]
    } else { return [userText, project] }
    }
  }

app.get("/quote/:string/:select", (req, res) => {
    let { string, select }= req.params
  console.log(JSON.stringify(defineMongoQuery(string,select), null, 4));
    const items = mongoGetNItems(defineMongoQuery(string,select)).then(d => res.json(d)).catch(e => console.log(e))
})


app.listen(port, () => console.log(`listening at ${port}`))
