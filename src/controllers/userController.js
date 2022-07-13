const { getUser }= require("../DAOs/DaoUser")

const perfilController = async (req, res) => {
    const user = await getUser(req.session.email)
    res.render("perfil", { user })    
}

module.exports = perfilController