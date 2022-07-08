const { Schema, model } = require("mongoose")

const cartSchema = new Schema ({
    nombre: {type: Object, required: true},
    autor: {type: Object, required: true},
    stock: {type: Object, required: true},
    precio: {type: Object, required: true},
    id: {type: Object, required: true},
})

const Cart = model("carrito", cartSchema)

module.exports = Cart