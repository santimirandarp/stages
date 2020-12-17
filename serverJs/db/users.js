const express = require('express')
const router = express.Router()
const client = require("./mongoDBClient")
const {findUser, deleteUser, createUser} = require("./crud")

const crudOp = async (req, res, client, crudFn) => {
  try {
    let { username, password } = req.body
    if(username && password){
      await client.connect() 
      const user = await crudFn(client, username, password)
      console.log("value of variable user is", user)
      if(user){ // found user?
        if (crudFn.name==="deleteUser"){
          return res.redirect(303, "/users/logout")
        } else {
            req.session.loggedIn = true;
            req.session.username = username;
           //user logged or reg, append to response
            res.username = username;
           return res.redirect(303, "/")
          }
      } else {
        return res.status(404).send({
          msg:"wrong password/user ? Try again"
        })
      }
    }} catch(e){ 
      console.log(e)
      return res.send({
        msg:"Wrong user or connection problem Try again"
      })
    } 
} 

// handle any /users related post requets.
router.post("/login|/register|/delete", (req, res) => {
  console.log("the path should be", req.path)
  const path = req.path
  if(path==="/login"){
    return crudOp(req, res, client, findUser).catch(console.error)
  }
  else if(path==="/register"){
    return crudOp(req, res, client, createUser).catch(console.error)
  }
  else if (path==="/delete"){
    return crudOp(req, res, client, deleteUser).catch(console.error)
  }
})


const renderObject = (title, formId, href, linkText) => {
  return {
    title:title,
    formId: formId,
    link:{
      href: href,
      text:` ${linkText}`
    }
  }}


router.get("/login", (req, res) => {
  req.session.loggedIn ?
    res.redirect(303, "/"):
    res.render("users", renderObject("Login", "login", "register", 
      "New user? Register")) 
})

router.get("/register", (req, res) => {
  req.session.loggedIn ?
    res.redirect(303, "/"):
    res.render("users", 
      renderObject("Registration", "register", "login", 
        "Coming Back? Log in Instead")) 
})

router.get("/delete", (req, res) => {
  req.session.loggedIn ?
    res.render("users", 
      renderObject("Remove User", "delete", "", 
        "Regret? Go back home")):
    res.redirect(303, "/login")
})


router.get("/logout", (req, res) => {
  req.session.destroy( (err) => {
    !err ? res.redirect(303, "/"):
      console.log(err)
  })
})

module.exports = router
