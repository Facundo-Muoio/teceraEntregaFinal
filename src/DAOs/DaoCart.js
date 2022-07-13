const Cart = require("../model/cart")

const addCart = async (nombre, autor, stock, precio, id) => {
   let carrito = new Cart({ nombre, autor, stock, precio, id })
   return carrito
}

const saveCart = async (cart) => {
    await cart.save()
}

module.exports = { addCart, saveCart }
