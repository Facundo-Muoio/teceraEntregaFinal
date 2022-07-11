const { Router } = require("express")
const router = Router()
const User = require("../model/user")
const Producto = require("../model/producto")
const Cart = require("../model/cart")
const passport = require("passport")
const transporter  = require("../nodemailer/nodemailer")
const logger = require("../logs/logger")
const updateStock = require("../controllers/updateStock")
const { sendMessageWp, sendMessage } = require("../twilio/twilio")

router.get("/", async (req, res) => {
    res.render("index")
})

router.get("/registro", (req, res) => {
    res.render("registro")
})

router.post("/registro", passport.authenticate("registro", {
    failureRedirect: "/registro",
    passReqToCallback: true
    }), async (req, res) => {
        const {name, address, years, email, phoneNumber, password} = req.body
        const photo = req.file
        await transporter.sendMail({
            from: '"Nuevo usuario registrado" <facundo.muoio@gmail.com>', // sender address
            to: "facundo.muoio@gmail.com", // list of receivers
            subject: "NUEVO REGISTO", // Subject line
            html: `
            <p>Se registro un nuevo usuario</p>
            <p>El usuario ${name} se registro con los siguientes datos: </p>
            <ul>
                <li>direccion: ${address}</li>
                <li>edad: ${years}</li>
                <li>email: ${email}</li>
                <li>password: ${password}</li>
                <li>numero de teléfono: ${phoneNumber}</li>
                <li>foto: ${photo.path}</li>
            </ul>
            `, // html body
          });
    res.redirect("/")
        
})

router.get("/inicio", (req, res) => {
    res.render("inicio")
})

router.post("/inicio",passport.authenticate("inicio", {
    failureRedirect: "/inicio",
    passReqToCallback: true    
    }), (req, res) => {
        const { email } = req.body
        req.session.email = email
        res.redirect("/")
    }
)

router.get("/salir", (req, res) => {
    req.logout((err) => {
        if(err){
            logger.error(err)
        } res.redirect('/');
    });   
})

router.get("/perfil", isAuthenticated, async (req, res) => {
    const user = await User.find({ email: req.session.email})
    res.render("perfil", { user })    
})

router.get("/productos", isAuthenticated, async (req, res) => {
    const productos = await Producto.find({})
    res.render("productos", { productos })
})

router.get("/carrito", isAuthenticated, (req, res) => {
    res.render("carrito")
})

router.get("/comprar", isAuthenticated, async (req, res) => {
    const user = await User.find({ email: req.session.email})
    const cart = req.session.cart
    const celular = user[0].phoneNumber
    updateStock(cart)
    await transporter.sendMail({
        from: `"Nuevo pedido de ${user[0].name}" <facundo.muoio@gmail.com>`, // sender address
        to: "facundo.muoio@gmail.com", // list of receivers
        subject: `NUEVO PEDIDO DE ${user[0].name}, email: ${user[0].email}`, // Subject line
        html: `
        <p>Se registro un nuevo pedido</p>
        <p>El usuario ${user[0].name} realizo el siguiente pedido: </p>
        <ul>
            <li>${cart.nombre}</li>
            <li>${cart.stock}</li>
            <li>${cart.precio}</li>
        </ul>
        `, // html body
      });
    sendMessageWp(user, cart)
    sendMessage(celular)
    res.redirect("/")
})

router.post("/comprar", isAuthenticated, async (req, res) => {
    const { nombre, autor, stock, precio, id } = req.body
    const carrito = new Cart({nombre, autor, stock, precio, id})
    req.session.cart = {nombre, autor, stock, precio, id}
    await carrito.save()
    res.redirect("/comprar")
})

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()) {
        return next()
    } 
    res.redirect("/")
}

module.exports = router
