//db call
const dotenv = require("dotenv")
dotenv.config({path: "./resources/.env"})
const { MongoClient } = require("mongodb")
//
const { DBUSER, PASS, CLUSTER_ID } = process.env
const uri = `mongodb+srv://${DBUSER}:${PASS}@${CLUSTER_ID}.mongodb.net/todos?authSource=admin`

async function mongoGetNItems(query) {
  let result
  try {
    const call = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    result = await call.db("todos").collection("quotes").aggregate(query).toArray()
  } catch (e) {
    console.log(e)
    throw `mongoGetAllItems. Execution error.\n ${e}`
  }
  return result
}

exports.mongoGetNItems = mongoGetNItems;
