const settings = document.querySelector(".settings")
const account = document.getElementById("account")

const toggleDisplay = (element) => {
  if(element.style.display=="block") {
    element.style.display="none"
    element.classList.remove("settings--height")
} else { 
  element.style.display="block" 
  element.classList.add("settings--height")
}
}

account.addEventListener("click", ( ) => toggleDisplay(settings))

