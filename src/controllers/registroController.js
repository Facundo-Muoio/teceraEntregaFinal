const { sendEmailRegistro } = require("./nodemailer")

const singUp = (req, res) => {
    res.render("registro")
}

const registrar = async (req, res) => {
    const {name, address, years, email, phoneNumber, password} = req.body 
    req.session.email = email   
    const photo = req.file
    await sendEmailRegistro(name, address, years, email, password, phoneNumber, photo)
    res.redirect("/")
}

module.exports = { singUp, registrar }