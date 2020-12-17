const pwd = document.querySelector("input[name=password]")
const user = document.querySelector("input[name=username]")
const form = document.getElementById("delete")
const uri = "http://localhost:3000/users/delete"


form.addEventListener("submit", (e) => {
  e.preventDefault()
  fetch(uri, fetchOptions({
    "username":user.value, 
    "password":pwd.value 
  })).then( res => {
    if(res.redirected){ 
      return window.location.href=res.url
    } else {return 0}
  }).catch(e => console.log(e))
})
