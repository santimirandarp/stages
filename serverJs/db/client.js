//this generates the client to connect w nice options
// just import as "client" and use `await client.connect()`
const { MongoClient } = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()

const { 
  DBUSER, 
  PASS, 
  CLUSTER_ID 
} = process.env

const cluster = `${DBUSER}:${PASS}@${CLUSTER_ID}`
const todosUri = `mongodb+srv://${cluster}.mongodb.net/todos`

const client = new MongoClient(todosUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource:"admin",
    poolSize:20,
    //tls:true,
    //reconnectTries:10, not compatible w unifiedTopology
    w:0
  })

module.exports = client //default export
