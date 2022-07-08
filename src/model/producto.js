const { Schema, model } = require("mongoose")

const productosSchema = new Schema({
    nombre: {type: String, required: true},
    autor: {type: String, required: true},
    genero: {type: String, required: true},
    precio: {type: String, required: true},
    imagen: {type: String, required: true},
    stock: {type: Number, required: true}
})

const Producto = model("producto", productosSchema)

module.exports = Producto