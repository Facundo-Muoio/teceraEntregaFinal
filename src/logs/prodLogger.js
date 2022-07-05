const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, errors, json } = format;

function prodLogger(){

    return createLogger({
        format: combine(
            colorize(),
            timestamp(), 
            errors({ stack: true }),
            json()
        ),
        transports: [
            new transports.Console()
        ]
    })

}

module.exports = prodLogger