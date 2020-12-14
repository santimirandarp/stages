async function postItem(client, item){
let quotes
  try{
    const client = await client.connect()
    quotes = await client
      .db("todos")
      .collection("quotes")
      .insertOne( {"quote":item.quote, "author":item.author})
  } catch(e){
    throw "Couldn't post the quote, please try again"
  } 
return quotes
}


async function getItems(client, query) {
  let quotes
  try {
    console.log("getting your fucking quote...")
    const client = await client.connect()
    quotes = await client
      .db("todos")
      .collection("quotes")
      .aggregate(query)
      .toArray()
    console.log(quotes)
  } catch (e) {
    throw `Getting quotes. Execution error.\n ${e}`
  } 
  return quotes
}

module.exports = { //setting the object
  mongoGetItems: getItems,
  mongoPostItem: postItem
}
