const btn = document.getElementById("btn")
const ul = document.getElementById("ul")
const select = document.querySelector("select")
const inputGet = document.getElementById("inputGet")
const drawList = items => {
   items.length !== 0 ? (
   items.forEach( item => ul.innerHTML+=` <li>${item.quote}</li>`)
   ) : ( ul.innerHTML=` <li>no matches</li>` )
}

btn.addEventListener("click", ()=>{
  let string, uri, selected
  selected = select.value
  string = inputGet.value || "-"
  uri = `http://localhost:3000/quote/${selected}/${string}`
  ul.innerHTML="Wait..."
    fetch(uri)
        .then(res=>res.json())
        .then(d => {ul.innerHTML=""
        drawList(d)} )
        .catch(e => ul.innerHTML= "Please, try again.")
})
