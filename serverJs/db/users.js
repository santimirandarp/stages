const express = require('express')
const router = express.Router()
const client = require("./client")
const {findUser, deleteUser, createUser} = require("./crud")

const crudOp = async (req, res, client, crudFn) => {
  try {
    let { username, password } = req.body
    if(username && password){
      await client.connect() 
      const user = await crudFn(client, username, password)
      if(user){ // found user?
        req.session.loggedIn = true;
        req.session.username = username;
        return crudFn.name=="deleteUser" ? 
          res.redirect(303, "/users/logout"):
          res.redirect(303, "/")
      } else {
        return res.status(404).send({msg:"wrong password/user ? Try again"})
        }
    }} catch(e){ 
        console.log(e)
        return res.send({msg:"Wrong user or connection problem Try again"})
      } 
} 
//probably can be re factored using regex into 1 fn
router.post("/login", (req, res) => {
  crudOp(req, res, client, findUser)
    .catch(console.error)
})

router.post("/register", (req, res) => {
  crudOp(req, res, client, createUser)
    .catch(console.error)
})

router.post("/delete", (req, res) => {
  crudOp(req, res, client, deleteUser)
    .catch(console.error)
})

const renderObject = (title, formId, href, linkText)=>{
return {
     title:title,
     formId: formId,
     link:{
       href: href,
       text:` ${linkText}`
     }
}}

//can be grouped in one fn using 
// regex

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
