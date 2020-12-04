const { MongoClient } = require("mongodb")

const dotenv = require("dotenv")
dotenv.config()

const { DBUSER, PASS, CLUSTER_ID } = process.env
const uri = `mongodb+srv://${DBUSER}:${PASS}@${CLUSTER_ID}.mongodb.net/todos?authSource=admin`

async function mongoGetItems(query) {
  let result
  console.log(JSON.stringify(query, null, 2))
  try {
    const call = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    result = await call.db("todos")
                       .collection("quotes")
                       .aggregate(query)
                       .toArray()
  } catch (e) {
    console.log(e)
    throw `Getting quotes. Execution error.\n ${e}`
  }
  return result
}

exports.mongoGetItems = mongoGetItems;
