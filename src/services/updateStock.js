const { getProductById, updateProductById, getProductByIndex, updateProductByIndex } = require("../DAOs/DaoProducto")

async function updateStock (obj) {
    const arrIds = obj.id
    if(typeof obj.id === "string" ){
        let number = Number(obj.stock)
        let producto = await getProductById(obj)
        let newStock = producto.stock - number
        await updateProductById(obj, newStock)
    } else {
        for(let i = 0; i < arrIds.length ; i++){
            let number = Number(obj.stock[i])
            let index = i
            let producto = await getProductByIndex(obj, index)
            let newStock = producto.stock - number
            await updateProductByIndex(obj, index, newStock)
        }  
    } 
}


// async function updateStock (obj) {
//     const arrIds = obj.id
//     if(typeof obj.id === "string" ){
//         let number = Number(obj.stock)
//         let producto = await getProductById(obj)
//         let newStock = producto.stock - number
//         await updateProductById(obj, newStock)
//     } else {
//         for(let i = 0; i < arrIds.length ; i++){
//             let number = Number(obj.stock[i])
//             let producto = await Producto.findById({_id : obj.id[i] })
//             let newStock = producto.stock - number
//             await Producto.findByIdAndUpdate({_id : obj.id[i]}, {stock: newStock})
//             }  
//     } 
// }

module.exports = updateStock