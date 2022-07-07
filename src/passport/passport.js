const passport = require("passport")
const LocalStrategy  = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const User = require("../model/user")

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser( async (id, done) => {
    const user = User.findById(id)
    done(null, user) 
})

async function hash(salt, password){
    const hash = await bcrypt.hash(password, salt)
    return hash
}

async function comparePassword(password, user){
    const result = await bcrypt.compare(password, user.password)
    return result
}
            
passport.use("registro", new LocalStrategy({
        usernameField: "email",
        passReqToCallback: true,
        session: false
    },
    async (req, email, password, done) => {
        const user = await User.findOne({ email: email })
        if(user){
            return done(null, false, req.flash("errorRegistro", "El email que esta ingresando ya se encuentra registrado."))
        } else {
            const {name, address, years, phoneNumber, email} = req.body
            const photo = req.file
            const passwordHashed = await hash(10, password)
            const newUser = User({name, address, years, phoneNumber, email, password : passwordHashed , photo})
            await newUser.save()
            return done(null, newUser)
        }
    }
))

passport.use("inicio", new LocalStrategy({
    usernameField: "email",
    passReqToCallback: true,
    session: false
    },
    async (req, email, password, done) => {
    const user = await User.findOne({ email: email })
    if(!user){
        return done(null, false, req.flash("errorInicioEmail", "El email que esta ingresando no se encuentra registrado."))
    } 
    if(! await comparePassword(password, user)){
        return done(null, false, req.flash("errorInicioPsw", "La contraseña es incorrecta. Intente ingresandola nuevamente."))
    } 
    return done(null, user)      
    }
))
