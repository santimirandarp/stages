const account = document.querySelector(".userItem__username")
const settings = document.querySelector(".userItem__settings")


const navBar = document.getElementById("navbar");
const navBarUl = document.querySelector(".navbar__ul");
const hamburger = document.querySelector(".hamburger");
const lines = hamburger.children;

const clickBurger = () => {
if (window.screen.width<700){
  if(navBar.style.height!=="75vh"){
    navBar.style.height="75vh"
    navBar.style.width="50vw"
    navBarUl.style.marginTop="4rem"
  } else{
    navBar.style.height="4rem"
    navBar.style.width="4rem"
  }
} else {
    navBar.style.overflow="auto"
    navBar.style.height="auto"
    navBar.style.width = "100%"
}
  lines[0].classList.toggle("hamburger__line1")
  lines[1].classList.toggle("hamburger__line2")
  lines[2].classList.toggle("hamburger__line3")
  return 
}
hamburger.addEventListener("click", ()=> clickBurger())
hamburger.addEventListener("resize", ()=> clickBurger())

const toggleUserSettings = (element) => {
  if(element.style.display=="block") {
    element.style.display="none"
    element.classList.remove("userItem__settings--height")
} else { 
  element.style.display="block" 
  element.classList.add("userItem__settings--height")
} }

account.addEventListener("click", ( ) => toggleUserSettings(settings))

