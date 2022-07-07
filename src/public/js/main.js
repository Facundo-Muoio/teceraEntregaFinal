import arrProducts from "./productos.js"

let containerCards = document.getElementById("container")

localStorage.setItem("productos", JSON.stringify(arrProducts))
const productos = JSON.parse(localStorage.getItem("productos"))

productos.forEach(e => {
    containerCards.innerHTML += `
    <div class="card bg-primary text-white mb-3" style="max-width: 20rem;">
    <div class="card-header">${e.genero.toUpperCase()}</div>
    <div class="card-body">
        <img  class="imgCards" src=${e.imagen}></img>
        <h4 class="card-title">${e.nombre}</h4>
        <h5 class="card-title">${e.autor}</h5>
        <h5 class="card-title">$ ${e.precio}<h5>
        <button type="button" class="btn btn-success" id="${e.id}" class="btnAdd">AGREGAR</button>
    </div>
`
})

for(let i = 1 ; i <= productos.length ; i++){
    console.log(i)
    let btn = document.getElementById(`${i}`)
    console.log(btn)
    btn.addEventListener("click", (e) => {
        let id = e.target.id
        if(!productos[id - 1].stock){
            btn.textContent = "SIN STOCK"
            btn.setAttribute("disabled", "")
        } else {
            productos[id - 1].stock =  productos[id - 1].stock - 1
            localStorage.setItem("productos", JSON.stringify(productos))
        }
    })
}

console.log(arrProducts)    