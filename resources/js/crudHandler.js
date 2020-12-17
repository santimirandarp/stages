const pwd = document.querySelector("input[name=password]")
const user = document.querySelector("input[name=username]")
const form = document.querySelector("form")
const uri = "http://localhost:3000/users/"+form.id


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
