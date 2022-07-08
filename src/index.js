const express = require("express")
const app = express()
const path = require("path")
require("dotenv").config({path:path.join(__dirname, "..", "development.env")})
const multer = require("multer")
const passport = require("passport")
require("./passport/passport")
const session = require("express-session")
const flash = require("connect-flash")
const methodOverride = require("method-override")

//args port y mode
const { port, mode } = require("./argvs/minimist.js")

//logger
const logger = require("./logs/logger")

//cluster 
const ServerClusterFork = require("./server/server")

//const rutas
const router = require("./routes/router")

//db const 
const connectDB = require("./db/db.js")

//setting port
app.set("port", process.env.PORT || process.env.YOUR_PORT)
app.set("views", path.join(__dirname, "public", "views"))
app.set("view engine", "ejs")

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.use(session({
    secret: "secreto",
    resave: true,
    saveUninitialized: false
}))

app.use(methodOverride("_method"))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use(multer({
    dest: path.join(__dirname, "public", "images")
}).single("photo"))

app.use((req, res, next) => {
    app.locals.errorRegistro = req.flash("errorRegistro")
    app.locals.errorInicioEmail = req.flash("errorInicioEmail")
    app.locals.errorInicioPsw = req.flash("errorInicioPsw")
    app.locals.user = req.user
    next()
})

//routes
app.use(router)

//probando logs
// logger.info("text info")
// logger.warn("text warn")
// logger.error("text err")
// logger.error(new Error("something went wrong"))

//coneccting to db
connectDB()

//starting server
const server = new ServerClusterFork()
server[mode](port,app) 