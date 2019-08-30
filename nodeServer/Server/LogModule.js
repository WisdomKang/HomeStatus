var winston = require('winston');
var winstonDaily = require("winston-daily-rotate-file");
var moment = require('moment-timezone');
var util = require('util');

const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return util.format("%s\t[%s]\t[%s]:%s" , timestamp, label, level, message);
});

function timeStampFormat(){
    return moment.tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss.SSS");
}

var logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: timeStampFormat
        }),
        myFormat
    ),
    label: "test",
    transports:[
        new winstonDaily({
            name: 'info-file',
            filename: './log/server-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            colorize: false,
            maxsize: '20m',
            maxFiles: '7d',
            level: 'info',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat,
        }),
        new winston.transports.Console({
            name: 'debug-console',
            colorize: true,
            level: 'debug',
            showLevel: true,
            json: false
        }),
        new winstonDaily({
            name: 'error-file',
            filename: './log/error/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            colorize: false,
            maxsize: '20m',
            maxFiles: '7d',
            level: 'error',
            showLevel: true,
            json: false
        })
    ],
    exceptionHandlers : [
        new winstonDaily({
            name: 'error-file',
            filename: './log/error/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            colorize: false,
            maxsize: '20m',
            maxFiles: '7d',
            level: 'error',
            showLevel: true,
            json: false
        }),
        new winston.transports.Console({
            name: 'debug-console',
            colorize: true,
            level: 'debug',
            showLevel: true,
            json: false
        })
    ]
});

module.exports = logger;