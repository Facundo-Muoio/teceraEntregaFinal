const nodemailer = require("nodemailer")
const logger = require("../logs/logger")

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.PSW_GMAIL
    }
})

transporter.verify().then(() => {
    logger.info("Listo para enviar emails")
}) 


module.exports = transporter