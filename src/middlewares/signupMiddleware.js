const passport = require("passport")

const verifySingUp =  passport.authenticate("registro", {
    failureRedirect: "/registro",
    passReqToCallback: true
})

module.exports = verifySingUp