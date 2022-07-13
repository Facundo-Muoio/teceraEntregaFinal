const passport = require("passport")


const verifyLogin = passport.authenticate("inicio", {
    failureRedirect: "/inicio",
    passReqToCallback: true    
})

module.exports = verifyLogin