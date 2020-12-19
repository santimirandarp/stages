const account = document.querySelector(".userItem__username")
const settings = document.querySelector(".userItem__settings")

const toggleDisplay = (element) => {
  if(element.style.display=="block") {
    element.style.display="none"
    element.classList.remove("userItem__settings--height")
} else { 
  element.style.display="block" 
  element.classList.add("userItem__settings--height")
} }

account.addEventListener("click", ( ) => toggleDisplay(settings))

