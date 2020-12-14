const express = require("express")
const router = express.Router()

const { 
  mongoGetItems, 
  mongoPostItem 
} = require("./getOrPost")

const { MongoClient } = ("./client")
const setQueryFromUrl = require("./setQuery")

const error = (code, msg, res) => res.status(code).send(msg) 

router.use(express.json())

router.get("/:selected/:string", (req, res) => {
    const { string, selected } = req.params
    const pipeline = setQueryFromUrl(string, selected)
    mongoGetItems(MongoClient, pipeline)
  //client is closed inside mongoPostItem
    .then(quotes => res.json(quotes) )
    .catch(e => {
      console.log(e.stack)
      error(500, "Can't reach the server. Try again.", res)
    })
})


router.post("/post", async (req, res) => {
  await mongoPostItem(MongoClient, req.body)
  //client is closed inside mongoPostItem
    .then( q => res.send(`quote was successfully posted`))
    .catch(e =>  error(500, "Can't reach server", res)) 
})

module.exports = router //default export
