const express = require("express")
const app = express()
const path = require("path")
require("dotenv").config({path:path.join(__dirname, "..", "development.env")})

//args port y mode
const { port, mode } = require("./argvs/minimist.js")

//logger
const logger = require("./logs/logger")

//cluster 
const ServerClusterFork = require("./server/server")

//const rutas
const router = require("./routes/router")

//setting port
app.set("port", process.env.PORT || process.env.YOUR_PORT)
app.set("views", path.join(__dirname, "public", "views"))
app.set("view engine", "ejs")

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

//routes
app.use(router)

//probando logs
logger.info("text info")
logger.warn("text warn")
logger.error("text err")
logger.error(new Error("something went wrong"))

//starting server
const server = new ServerClusterFork()
server[mode](port,app) 