const pwd = document.querySelector("input[name=password]")
const user = document.querySelector("input[name=username]")
const form = document.querySelector("form")
const uri = "http://localhost:3000/users/"+form.id

const checkbox = document.querySelector("input[type=checkbox]")

const fetchOptions = data => {
  return { 
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'include', 
    headers: { 'Content-Type': 'application/json' },
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data)
  }}

checkbox.addEventListener("click", function myFunction() {
  if (pwd.type === "password") {
    pwd.type = "text";
  } else {
    pwd.type = "password";
  }
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const informUser = document.getElementById("informUser") 
  informUser.innerHTML="Sending Data To Server..."
  fetch(uri, fetchOptions({
    "username":user.value, 
    "password":pwd.value 
  })).then(res => {
    if(res.redirected){ 
      window.location.href=res.url
      return { msg: "success" }
    } else {
      return res.json()
    }
  })
    .then(json => { informUser.innerHTML=json.msg })
    .catch(e => console.log(e))
})

