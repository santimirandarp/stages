const btn = document.getElementById("btn")
const ul = document.getElementById("ul")
const select = document.querySelector("select")
const inputGet = document.getElementById("inputGet")
const drawList = (items)=>{
   items.length !== 0 ? (items.forEach(item=>ul.innerHTML+=`
  <li>${item.quote}</li>`)) : ( ul.innerHTML=`
 <li>no matches</li>` )
}
let key, uri, selected

btn.addEventListener("click", ()=>{
  selected = select.value
  key = inputGet.value == "" ? "asdfgh": inputGet.value
  uri = `http://localhost:3000/quote/${key}/${selected}`
  ul.innerHTML="Wait..."
    fetch(uri)
        .then(res=>res.json())
        .then(d => {ul.innerHTML=""
        drawList(d)} )
        .catch(e => ul.innerHTML="can't get the data")
})
