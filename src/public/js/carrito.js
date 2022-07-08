let tbody = document.getElementById("containerTable")
const arr = JSON.parse(sessionStorage.getItem("cart"))
let formComprar = document.getElementById("formComprar")
arr.forEach(e => {
    let newPrecio = e.precio.substring(1)
    let precio = Number(newPrecio) * e.stock
    tbody.innerHTML += `
    <tr class="table-primary">
            <td>${e.nombre}</td>
            <td>${e.autor}</td>
            <td>${e.stock}</td>
            <td>${precio}</td>
            <td><button type="button" class="btn btn-danger btnDelete">delete</button></td>
            <td hidden>${e.id}</td>
    </tr>
    `  
    formComprar.innerHTML += `
    <input name="nombre" type="text" hidden value="${e.nombre}" form="formComprar"></input>
    <input name="autor" type="text" hidden value="${e.autor}" form="formComprar"></input>
    <input name="stock" type="text" hidden value="${e.stock}" form="formComprar"></input>
    <input name="precio" type="text" hidden value="${precio}" form="formComprar"></input>
    <input name="id" type="text" hidden value="${e.id}" form="formComprar"></input>
    `
})


const btnsDelete = document.getElementsByClassName("btnDelete")
for(let btn of btnsDelete){
btn.addEventListener("click", (e) => {
    let id = btn.parentElement.nextElementSibling.textContent
    let arr = JSON.parse(sessionStorage.getItem("cart"))
    let newArr = arr.filter(e => e.id !== id)
    sessionStorage.setItem("cart", JSON.stringify(newArr))
    tbody.innerHTML = " "
    formComprar.innerHTML = ""
    newArr.forEach(e => {
        let newPrecio = e.precio.substring(1)
        let precio = Number(newPrecio) * e.stock
        tbody.innerHTML += `
        <tr class="table-primary">
                <td>${e.nombre}</td>
                <td>${e.autor}</td>
                <td>${e.stock}</td>
                <td>${precio}</td>
                <td><button type="button" class="btn btn-danger btnDelete">delete</button></td>
                <td hidden>${e.id}</td>
        </tr>
        `  
        formComprar.innerHTML += `
        <input name="nombre" type="text" hidden value="${e.nombre}" form="formComprar"></input>
        <input name="autor" type="text" hidden value="${e.autor}" form="formComprar"></input>
        <input name="stock" type="text" hidden value="${e.stock}" form="formComprar"></input>
        <input name="precio" type="text" hidden value="${precio}" form="formComprar"></input>
        <input name="id" type="text" hidden value="${e.id}" form="formComprar"></input>
        `
        window.location.reload()
    })
 })
}




