const User = require("../model/user")

async function getUser(email){
    const user = await User.find({ email: email})
    return user
}

module.exports = { getUser }
