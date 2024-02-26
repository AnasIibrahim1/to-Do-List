const button = document.querySelector(".btn_update")
console.log(button)
const main = document.getElementById("main")
console.log(main)
const inp = document.querySelector("input")
console.log(inp)

// Start Event of Button
button.addEventListener("click",
(eo) => {
  eo.preventDefault()
  if(inp.value == 0){
    alert("Enter your hint !! ")
  }
  else{
    const div = `<div class="note">
    <span class="icon-star-full"></span>
    <h4 class ="h4">${inp.value}</h4>
    <div>
        <span class="icon-bin2"></span>
        <span class="icon-angry2"></span>
    </div>`
    main.innerHTML += div
  }
  
})
// End Event of Button
main.addEventListener("click", (eo) => {

  switch (eo.target.className) {
// Start Recycle Ben Event
    case "icon-bin2":
      console.log("bin")
      eo.target.parentElement.parentElement.remove()
      break;
// End Recycle Ben Event

// Start Angry Event "change to heart and return"
      case "icon-angry2":
      console.log("angry")
      eo.target.classList.remove("icon-angry2")
      eo.target.classList.add("icon-heart")
      eo.target.parentElement.parentElement.getElementsByClassName("h4")[0].classList.add("angry")
      
      break;
// End Angry Event

// Start Heart Event
case "icon-heart":
  console.log("heart")
  eo.target.parentElement.parentElement.getElementsByClassName("h4")[0].classList.remove("angry")
  eo.target.classList.remove("icon-heart")
  eo.target.classList.add("icon-angry2")

  break;
// End Heart Event

// Start Star Event
      case "icon-star-full":
      console.log("star")
      eo.target.classList.add("Star_active");
      main.prepend(eo.target.parentElement)
      break;

        case "icon-star-full Star_active" :
      eo.target.classList.remove("Star_active")
      main.append(eo.target.parentElement)
        break;
  }

})