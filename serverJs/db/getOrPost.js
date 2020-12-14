async function postItem(client, item){
let quotes
  try{
    await client.connect()
    quotes = await client.db("todos")
      .collection("quotes")
      .insertOne( {"quote":item.quote, "author":item.author})
  } catch(e){
    throw "Couldn't post the quote, please try again"
  } finally{ client.close() }
return quotes
}


async function getItems(client, query) {
  let quotes
  try {
    await client.connect()
    quotes = await client.db("todos")
      .collection("quotes")
      .aggregate(query)
      .toArray()
  } catch (e) {
    throw `Getting quotes. Execution error.\n ${e}`
  } finally { client.close() }
  return quotes
}

module.exports = { //setting the object
  mongoGetItems: getItems,
  mongoPostItem: postItem
}
