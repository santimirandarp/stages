const express = require("express")
const router = express.Router()

const { 
  //both are async functions => return a promise
  mongoGetItems, 
  mongoPostItem 
} = require("./getOrPost")

const { client } = ("./client")
const setQueryFromUrl = require("./setQuery")

const error = (code, msg, res) => res.status(code).send(msg) 

router.use(express.json())

router.get("/:selected/:string", (req, res) => {
    const { string, selected } = req.params
    const pipeline = setQueryFromUrl(string, selected)
    mongoGetItems(client, pipeline)
    .then(quotes => res.json(quotes) )
    .catch(e => {
      console.log(e.stack)
      error(500, "Can't reach the server. Try again.", res)
    })
})


router.post("/post", async (req, res) => {
  mongoPostItem(MongoClient, req.body)
    .then( q => res.send(`quote was successfully posted`))
    .catch(e =>  error(500, "Can't reach server", res)) 
})

module.exports = router //default export
