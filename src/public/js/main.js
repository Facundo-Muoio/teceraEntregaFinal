
let btnsLess = document.getElementsByClassName("btnLess")
let btnsAdd = document.getElementsByClassName("btnAdd")
let btnAddToCart = document.getElementsByClassName("btnAddToCart")
let cart = document.getElementById("cart")
let number = 0 
const arrCart = []


let divs = document.getElementsByClassName("containerBtns")
for(let div of divs){
    const parentDiv = div.parentElement
    let id
    for (let i = 0; i < parentDiv.children.length - 1 ; i++) {
        if(i == 4 ){
            id = parentDiv.children[i].textContent
        } 
    }
}

for( let btn of btnsLess){
    btn.addEventListener("click", (e) => {
        let hermano = btn.nextElementSibling
        if(Number(hermano.textContent) > 1){
            hermano.textContent = Number(hermano.textContent) - 1
        }
    })
}

for( let btn of btnsAdd){
    btn.addEventListener("click", (e) => {
        let hermano = btn.previousElementSibling
        let max = Number(btn.parentElement.previousElementSibling.textContent)
        if(Number(hermano.textContent) < max){
            hermano.textContent = Number(hermano.textContent) + 1
        }
    })
}

for( let btn of btnAddToCart){
    btn.addEventListener("click", (e) => {
        let nombre = btn.parentElement.firstElementChild.nextElementSibling.textContent
        let autor = btn.parentElement.firstElementChild.nextElementSibling.nextElementSibling.textContent
        let precio = btn.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent
        let stock = Number(btn.previousElementSibling.firstElementChild.nextElementSibling.textContent)
        let id = btn.previousElementSibling.previousElementSibling.previousElementSibling.textContent
        if(!JSON.parse(sessionStorage.getItem("cart"))){
            sessionStorage.setItem("cart", JSON.stringify(arrCart))  
        }
        let producto = JSON.parse(sessionStorage.getItem("cart")).find(e => e.id === id)
        if(producto){
           const arr = JSON.parse(sessionStorage.getItem("cart"))
           for(let e of arr){
            if(e.id === producto.id){
                e.stock = stock
            }
           }
            sessionStorage.setItem("cart", JSON.stringify(arr))   
        } else {
            const arr = JSON.parse(sessionStorage.getItem("cart"))
            arr.push({ nombre, autor, precio, stock, id })
            sessionStorage.setItem("cart", JSON.stringify(arr))
        }
        const arr = JSON.parse(sessionStorage.getItem("cart"))
        number = 0
        for (let e of arr){
            number = number + e.stock
        }
        if(number > 0){
            cart.innerText = `Carrito ${number}`
        }
    })
}
