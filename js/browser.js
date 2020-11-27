const btn = document.getElementById("btn")
const ul = document.getElementById("ul")
const drawList = (items)=>{
  items.forEach(item=>ul.innerHTML+=`
  <li>${item.msg}</li>`)
}

btn.addEventListener("click", ()=>{
  ul.innerHTML="Wait..."
    fetch("http://localhost:3000/todos")
        .then(res=>res.json())
        .then(d => {ul.innerHTML=""
        drawList(d)} )
        .catch(e => ul.innerHTML="can't get the data")
})
