const express = require("express")
const router = express.Router()

const { mongoGetItems } = require("./resources/linkToDatabase")
const { setQuery } = require("./resources/setQuery")


//quotes call, root
router.get("/:selected/:string", (req, res) => {
    const { string, selected } = req.params
    const query = setQuery(string, selected)
    mongoGetItems(query)
    .then(d => res.json(d))
    .catch(e => {
      console.log(e); 
      const err = new Error("Sorry, there was problem")
      err.status = 500
      res.send(err) })
})

router.post("/post", (req,res)=>{
    console.log("post request")
   // postQuote(msg)
})

module.exports=router
