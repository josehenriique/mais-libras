const accordions = document.querySelectorAll(".accordion")
const accordionNav = document.querySelectorAll("#app-model")

function accordionModel(list){
  list.forEach(e => {
    console.log(e)
    e.addEventListener('click', () => {
      let body = e.querySelector('.accordion-body')
      body.classList.toggle("active")
    })
  })
}

accordionModel(accordions)
accordionModel(accordionNav)