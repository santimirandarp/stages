const pwd = document.querySelector("input[name=password]")
const user = document.querySelector("input[name=username]")
const form = document.getElementById("login")
const uri = "http://localhost:3000/users/login"

form.addEventListener("submit", (e) => {
  e.preventDefault()
  fetch(uri, fetchOptions({
    "username":user.value, 
    "password":pwd.value 
  })).then(res => res)
  .catch(e=>console.log(e))
})
