const Producto  = require("../model/producto")

async function updateStock (obj) {
    const arrIds = obj.id
    if(typeof obj.id === "string" ){
        let number = Number(obj.stock)
        let producto = await Producto.findById({_id : obj.id})
        let newStock = producto.stock - number
        await Producto.findByIdAndUpdate({_id: obj.id}, {stock: newStock})
    } else {
        for(let i = 0; i < arrIds.length ; i++){
            let number = Number(obj.stock[i])
            let producto = await Producto.findById({_id : obj.id[i] })
            let newStock = producto.stock - number
            await Producto.findByIdAndUpdate({_id : obj.id[i]}, {stock: newStock})
            }  
    } 
}

module.exports = updateStock