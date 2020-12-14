//sections use a unique descriptive word. BEM convention.
const select = document.querySelector(".requests__get select")
const inputGet = document.querySelector(".requests__get input")
const formGet = document.querySelector(".requests__get")

const drpDown = document.querySelector(".requests__dropdown")

const formPost = document.querySelector(".requests__post")
const postInputs = document.querySelectorAll(".requests__post input")
const inputQuote = postInputs[0]
const inputAuthor = postInputs[1]


const quotesUl = document.querySelector(".quotes__ul")

const baseUri = "http://localhost:3000/todos"

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


const drawList = items => {
  items.length !== 0 ? (
    items.forEach( item => {
      quotesUl.innerHTML += `<li>${item.quote}</li>`
    })
  ) : ( quotesUl.innerHTML = `<li>no matches</li>` )
}

const rmSideQuotes = (quote) => {
 if(quote.charAt(0)=="'"||"\""){
   quote = quote.replace(quote.charAt(0), "")
}
 if(quote.charAt(quote.length-1)=="'"||"\""){
   quote = quote.replace(quote.charAt(quote.length-1), "")
 }
return quote 
}

formGet.addEventListener("submit", e => {
  e.preventDefault()
  let quote, selected
  selected = select.value
  quote = rmSideQuotes(inputGet.value) || "-"
  const sendTo = `${baseUri}/${selected}/${quote}`
  quotesUl.innerHTML = "Wait..."
  fetch(sendTo)
    .then(res => res.json())
    .then(d => { quotesUl.innerHTML=""; drawList(d)} )
    .catch(e => quotesUl.innerHTML= "Please, try again.")
})

formPost.addEventListener("submit", (e) => {
  e.preventDefault()
  let quote, author
  author = rmSideQuotes(inputAuthor.value) || "missing"
  quote = rmSideQuotes(inputQuote.value)
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


drpDown.addEventListener("click", () => {
    if (window.screen.width>750){
      formPost.style.display="grid"
      inputQuote.focus()  
    } else {
      if (formPost.style.display!="grid"){ 
       formPost.style.display="grid"
       inputQuote.focus()  
      } else { formPost.style.display="none" }
    }
  })
