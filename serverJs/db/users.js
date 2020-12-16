const express = require('express')
const router = express.Router()

const client = require("./client")
const findUser = async (client, username, password) => {
  const user = await client
    .db("todos")
    .collection("users")
    .findOne(
      { 
        username:username, 
        password:password 
      },
      { username:1, password:1 } )
  return user
}

const login = async (req, res, client) => {
  try {
    let { username, password } = req.body
    if(username && password){
      await client.connect() 
      const user = await findUser(client, username, password)
      if(user){ // found user?
        req.session.loggedIn = true;
        req.session.username = username;
        res.redirect(301, "/");
      }}} catch(e){ 
        console.log(e)
      } 
} 

router.post("/login", (req, res) => {
  login(req, res, client)
    .catch(console.error)
})

module.exports = router
