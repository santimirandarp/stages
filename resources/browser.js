//the html class naming is organized in a way that sections determine the class name of any
// sub element. There shouldn't be any 2 sections with same class
// then all subelements' name are unique.
const getQuotes = document.querySelector(".requests__get")
const select = document.querySelector(".requests__get select")
const inputGet = document.querySelector(".requests__get input")

const form = document.querySelector(".requests__post form")
const postQuote = requests.querySelector("button")
const postInputs = requests.querySelectorAll("input")
const quotesUl = document.querySelector(".quotes__ul")
const drawList = items => {
   items.length !== 0 ? (
   items.forEach( item => quotesUl.innerHTML += `<li>${item.quote}</li>`)
   ) : ( quotesUl.innerHTML=` <li>no matches</li>` )
}

getQuotes.addEventListener("click", ()=>{
  let string, uri, selected
  selected = select.value
  string = inputGet.value.trim() || "-"
  uri = `http://localhost:3000/quote/${selected}/${string}`
  quotesUl.innerHTML = "Wait..."
    fetch(uri)
        .then(res => res.json())
        .then(d => { quotesUl.innerHTML=""; drawList(d)} )
        .catch(e => quotesUl.innerHTML= "Please, try again.")
})


postQuotes.addEventListener("click", ()=>{
  let quote, author
  author = <input1>.value
  quote = <input2>.value
  string = inputGet.value.trim() || "-"
  uri = "http://localhost:3000/quote/post"
    fetch(uri, options)
        .then(res => res.json())
        .then(d => { quotesUl.innerHTML=""; drawList(d)} )
        .catch(e => quotesUl.innerHTML= "Please, try again.")
})
