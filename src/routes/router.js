const { Router } = require("express")
const router = Router()
const User = require("../model/user")
const passport = require("passport")
const transporter  = require("../nodemailer/nodemailer")
const logger = require("../logs/logger")

router.get("/", async (req, res) => {
    const users = await User.find({})
    res.render("index", {users})
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

router.get("/productos", isAuthenticated, (req, res) => {
    res.render("productos")
})

router.get("/carrito", isAuthenticated, (req, res) => {
    res.render("carrito")
})


function isAuthenticated(req, res, next){
    if(req.isAuthenticated()) {
        return next()
    } 
    res.redirect("/")
}

module.exports = router
