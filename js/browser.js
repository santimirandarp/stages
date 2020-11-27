const btn = document.getElementById("btn")
const ul = document.getElementById("ul")
const drawList = (items)=>{items.forEach(item=>ul.innerHTML=`
<li>${item.msg}</li>`)}

btn.addEventListener("click", ()=>{
    fetch("https://localhost:3000/todos")
        .then(res=>res.json())
        .then(d=>drawList(d))
        .catch(e=>console.log(e))
})