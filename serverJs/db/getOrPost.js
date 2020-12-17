async function postItem(client, item){
let quote
  try{
    client = await client.connect()
    quotes = await client
      .db("todos")
      .collection("quotes")
      .insertOne( {"quote":item.quote, "author":item.author})
    return quote
  } catch(e){
    throw "Couldn't post the quote, please try again"
  } 
}


async function getItems(client, query) {
  let quotes
  try {
    client = await client.connect()
    quotes = await client
      .db("todos")
      .collection("quotes")
      .aggregate(query)
      .toArray()
    return quotes
  } catch (e) {
    throw `Getting quotes. Execution error.\n ${e}`
  } 
}

module.exports = { //setting the object
  mongoGetItems: getItems,
  mongoPostItem: postItem
}
