const transporter  = require("../nodemailer/nodemailer")

const sendEmailRegistro =  async (name, address, years, email, password, phoneNumber, photo) => {
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
      })
}  

const sendEmailPedido = async (user, cart) => {
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
    })
}
 

module.exports = { sendEmailRegistro, sendEmailPedido }