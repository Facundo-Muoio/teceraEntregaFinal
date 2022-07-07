const { Schema, model } = require("mongoose")

const userSchema  = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    years: { type: Number, required: true },
    email: { type: String, required: true },
    password: {type: String, required: true},
    photo: Object, 
    phoneNumber: { type: Number, required: true}
})

const User = model("user", userSchema)

module.exports = User