//the html class naming is organized in a way that sections determine the class name of any
// sub element. There shouldn't be any 2 sections with same class
// then all subelements' name are unique.
const select = document.querySelector(".requests__get select")
const inputGet = document.querySelector(".requests__get input")
const formGet = document.querySelector(".requests__get")

const form = document.querySelector(".requests__post")
const postInputs = document.querySelectorAll(".requests__post input")
const inputQuote = postInputs[0]
const inputAuthor = postInputs[1]

const quotesUl = document.querySelector(".quotes__ul")

const fetchOptions = data => {
return { 
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data)
}}

let baseUri = "http://localhost:3000/quote"

const drawList = items => {
  items.length !== 0 ? (
    items.forEach( item => {
      quotesUl.innerHTML += `<li>${item.quote}</li>`
    })
  ) : ( quotesUl.innerHTML = `<li>no matches</li>` )
}

formGet.addEventListener("submit", (e)=>{
  e.preventDefault()
  let quote, selected
  selected = select.value
  quote = inputGet.value.trim() || "-"
  const sendTo = `${baseUri}/${selected}/${quote}`
  quotesUl.innerHTML = "Wait..."
  fetch(sendTo)
    .then(res => res.json())
    .then(d => { quotesUl.innerHTML=""; drawList(d)} )
    .catch(e => quotesUl.innerHTML= "Please, try again.")
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  let quote, author
  author = inputAuthor.value || "missing"
  quote = inputQuote.value.trim()
  const sendTo= `${baseUri}/post`
  quotesUl.innerHTML=`Sending data..!`
  fetch(sendTo, fetchOptions({author:author, quote:quote}))
  .then(res => res.text()).then( success => {
      quotesUl.innerHTML=`<div class="requests__response"><p>
      ${quote}<br/>by ${author}</p><p>${success}</p><img src="./img/checkmark.png"
    class="request__response-img" alt="image yet"/></div>`
      inputAuthor.value = ""
      inputQuote.value = ""
      return 1
    }).catch(e => "Please, try again.")
})

