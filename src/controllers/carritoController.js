const { getUser } = require("../DAOs/DaoUser")
const updateStock = require("../services/updateStock")
const { sendEmailPedido } = require("./nodemailer")
const { sendMessageWp, sendMessage } = require("../twilio/twilio")
const { addCart, saveCart } = require("../DAOs/DaoCart")

const carrito = (req, res) => {
    res.render("carrito")
}

const finalizarCompra = async (req, res) => {
    const user = await getUser(req.session.email)
    const cart = req.session.cart
    const celular = user[0].phoneNumber
    updateStock(cart)
    await sendEmailPedido(user, cart)
    sendMessageWp(user, cart)
    sendMessage(celular)
    res.redirect("/")
}

const comprar = async (req, res) => {
    const { nombre, autor, stock, precio, id } = req.body
    const carrito = await addCart( nombre, autor, stock, precio, id )
    req.session.cart = { nombre, autor, stock, precio, id }
    await saveCart(carrito)
    res.redirect("/comprar")
}

module.exports = {carrito, finalizarCompra, comprar}
