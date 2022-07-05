const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, printf, label, errors } = format;

function devLogger(){
    const logFormat = printf(({level, message, label, timestamp, stack}) => `${timestamp} [${label}] ${level}: ${stack || message}` )

    return createLogger({
        format: combine(
            colorize(),
            label({ label: "FACUNDO MUOIO"}), 
            timestamp({ format: "DD-MM-YYYY HH:mm:ss" }), 
            errors({ stack: true }),
            logFormat
        ),
        transports: [
            new transports.Console()
        ]
    })

}

module.exports = devLogger