const parseArgs = require("minimist")

//config minimist
const options = {
    alias: {
        p:"port",
        m:"mode"
    }, 
    default: {
        port: process.env.PORT || process.env.YOUR_PORT,
        mode: "fork"
    }
}

const { port, mode } = parseArgs(process.argv.slice(2), options)

module.exports = { port, mode }