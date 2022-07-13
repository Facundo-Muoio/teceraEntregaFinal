const accountSid = "AC1187f7f8e3b084d1202523a35f5e79fc"; 
const authToken = "341f6ba09c932ca5cb9fd4725838ba52"; 
const client = require('twilio')(accountSid, authToken); 

function sendMessageWp(user, cart){
    client.messages 
      .create({ 
         body: `NUEVO PEDIDO DE ${user[0].name}
         email: ${user[0].email}
         El usuario ${user[0].name} realizo el siguiente pedido:
         ${cart.nombre}
         ${cart.stock}
         ${cart.precio}
         `, 
         from: 'whatsapp:+14155238886',       
         to: "whatsapp:+5493513400712"
       }) 
      .then(message => console.log(message.sid)) 
      .done();
}

function sendMessage(clientPhone){
    let celular = String(clientPhone)
    console.log(celular)
    client.messages 
    .create({ 
       body: "Su pedido fue recibido y se encuentra en proceso" ,
       from: "+19896757824",       
       to: `+54${celular}`
     }) 
    .then(message => console.log(message.sid)) 
    .done();
}

module.exports = {sendMessageWp, sendMessage}