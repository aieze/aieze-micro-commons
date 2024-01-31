var winston = require("winston");
const { format } = require("winston");
const { combine, timestamp, label, printf } = format;

const tsFormat = () =>
    moment()
        .utcOffset("330")
        .format("YYYY-MM-DD hh:mm:ss")
        .trim();

var options = {
    file: {
        level: "info",
        colorize: false,
        timestamp: tsFormat,
        filename: `./logs/vc.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 2
    },
    debugFile: {
        level: "debug",
        timestamp: tsFormat,
        filename: `./logs/aieze-debug.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 2,
        colorize: true
    },
    errorFile: {
        level: "error",
        timestamp: tsFormat,
        filename: `./logs/aieze-error.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 2,
        colorize: true
    },
    console: {
        level: "debug",
        handleExceptions: true,
        json: true
    }
};


const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message} `;
});

let logger = winston.createLogger({
    format: combine(
        label({ label: `${process.env.MODULE}` }),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        myFormat
    ),
    transports: [

        new winston.transports.File(options.errorFile),
        new winston.transports.Console(options.console)

    ],
    exitOnError: false
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(" FROM EVENT " + message);
    }
};

module.exports = logger;
