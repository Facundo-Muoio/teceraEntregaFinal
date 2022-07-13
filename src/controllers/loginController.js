const login = (req, res) => {
    res.render("inicio") 
}

const loguear =  (req, res) => {
    const { email } = req.body
    req.session.email = email
    res.redirect("/")
}

module.exports = { login, loguear }