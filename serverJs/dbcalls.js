const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const { mongoGetItems, mongoPostItem } = require("./linkToDatabase")
const { setQuery } = require("./setQuery")

const jsonParser = bodyParser.json()
//const urlencodedParser = bodyParser.urlencoded({ extended: false })

//quotes call, root
router.get("/:selected/:string", (req, res) => {
    const { string, selected } = req.params
    const query = setQuery(string, selected)
    mongoGetItems(query)
    .then(quotes => res.json(quotes))
    .catch(e => {
      console.log(e); 
      const err = new Error("Sorry, there was problem")
      err.status = 500
      res.send(err) })
})

router.post("/post", jsonParser, async (req, res) => {

  await mongoPostItem(req.body)
    .then( q => res.send(`quote was successfully posted`))
    .catch(e => console.log(e)) 
})

module.exports=router
