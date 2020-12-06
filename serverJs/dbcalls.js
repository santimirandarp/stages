const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const { mongoGetItems, mongoPostItem } = require("./linkToDatabase")
const { setQuery } = require("./setQuery")

const urlencodedParser = bodyParser.urlencoded({ extended: false })
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

router.post("/post", urlencodedParser, async (req, res) => {
  await mongoPostItem(req.body.quote)
  res.send(`${req.body.quote} is posted`)
})

module.exports=router
