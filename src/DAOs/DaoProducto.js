const Producto = require("../model/producto")

const getProductos = async () => {
    const productos = await Producto.find({})
    return productos
}

const getProductById = async (obj) => {
    let producto = await Producto.findById({_id : obj.id})
    return producto
}

const updateProductById = async (obj, newStock) => {
    await Producto.findByIdAndUpdate({_id: obj.id}, {stock: newStock}) 
}

const getProductByIndex = async (obj, index) => {
    let producto = await Producto.findById({_id : obj.id[index] })
    return producto 
}

const updateProductByIndex = async (obj, index, newStock) => {
    await Producto.findByIdAndUpdate({_id : obj.id[index]}, {stock: newStock})
}

module.exports = { getProductos, getProductById, updateProductById, getProductByIndex, updateProductByIndex }