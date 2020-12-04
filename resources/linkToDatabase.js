const { MongoClient } = require("mongodb")

const dotenv = require("dotenv")
dotenv.config()

const { DBUSER, PASS, CLUSTER_ID } = process.env
const uri = `mongodb+srv://${DBUSER}:${PASS}@${CLUSTER_ID}.mongodb.net/todos?authSource=admin`

function connection(){
  return MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
async function mongoPostItem(item){
let quotes
  try{
    const call = await connection()

    quotes = await call.db("todos")
      .collection("quotes")
      .insertOne( {"quote":item})
  } catch(e){
    console.log(e)
    throw "Couldn't post the quote, please try again"
  }
return quotes
}


async function mongoGetItems(query) {
  let quotes
  //  console.log(JSON.stringify(query, null, 2))
  try {
    const call = await connection()
    quotes = await call.db("todos")
      .collection("quotes")
      .aggregate(query)
      .toArray()
  } catch (e) {
    console.log(e)
    throw `Getting quotes. Execution error.\n ${e}`
  }
  return quotes
}

exports.mongoGetItems = mongoGetItems;
exports.mongoPostItem = mongoPostItem;
