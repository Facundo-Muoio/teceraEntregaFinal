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
            new transports.File({
                maxsize: 5120000,
                maxFiles: 5,
                filename: `${__dirname}/logs.log`
            }),
            new transports.Console()
        ]
    })

}

module.exports = prodLogger