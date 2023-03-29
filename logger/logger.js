//const { createLogger } = require('winston');
const { format, transports, createLogger } = require("winston");
const winston = require("winston");
require("winston-daily-rotate-file"); //αυτό είναι για να γράψω σε αρχείο και όχι στην κοσνόλα
require("winston-mongodb"); //για να γράψω στην βάση μου τα logs
require("dotenv").config(); //σύνδεση με την mongodb

//logger για να γράψω στην κοσνόλα:
// const logger = winston.createLogger({
//     level: "debug",
//     format: winston.format.json(),
//     transports: [new winston.transports.Console()] //εμφανίζει τα logs στην console.log
// })

const { combine, timestamp, label, printf, prettyPrint } = format; //mongodb, είναι το format
//της πρώτης εντολής (κοίτα επάνω) > είναι το format της log εγγραφής

const CATEGORY = "winston custom format"; //mongodb, τυχαίο text για label
// const customForamt = printf(
//     ({ level, message, label, timestamp }) => {
//         return `${timestamp} [${label}], ${level}: ${message}`;
//     }
// ); //mongo , του λέω τι να γράψει στην βάση

const fileRotateTransport = new transports.DailyRotateFile({
  //κρατάει το αρχείο για 14days και μετά δημιουργεί ένα νέο αρχείο πάλι με την ημερομηνία
  filename: "logs/rotate-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  maxFiles: "14d", //κράτα τα αρχεία για 14 ημέρες μέγιστο
});

//logger για να γράψω σε αρχείο:
//transports: ορίζω τις εξόδους στις οποίες θα γράψει
const logger = createLogger({
  level: "debug",
  //format: winston.format.json, //για files
  //mongodb:
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "DD-MM-YYYY HH:MM:SS",
    }),
    // format.json() //είτε αυτό, είτε η κάτω γραμμή, το json βάζει όλα τα στοιχεία της εγγραφής σε μία γραμμή (είναι προτιμητέο)
    prettyPrint() //φέρνει τα στοιχεία της μία εγγραφής το ένα κάτω από το άλλο (έχει όγκο)
  ),
  transports: [
    fileRotateTransport, //rotate αρχείο
    new transports.File({
      //αρχείο, δεν είναι rotate (δεν είναι σωστή πρακτική)
      filename: "logs/example.log",
    }),
    new transports.File({
      //αρχείο, δεν είναι καλή πρακτική που επίσης δεν είναι rotate
      level: "error", //level: info, warning κλπ
      filename: "logs/error.log",
    }),
    new transports.Console(), //κονσόλα
    new transports.MongoDB({
      //βάση δεδομένων, ό,τι είναι error του λέω να τα αποθηκεύει στην mongodb
      level: "error",
      db: process.env.MONGODM_URI, //παίρνει τα στοιχεία από το .env αρχείο
      options: {
        userUnifiedTopology: true,
      },
      collection: "server_logs",
      format: format.combine(format.timestamp(), format.json()),
    }),
    //για files:
    // ,
    // new this.transports.File({
    //     filename: "logs/error.log" //στην περίπτωσή μας δεν γράφονται μόνο τα errors,
    //     //γιατί δεν έχουμ φτιάξει τέτοιον κώδικα
    //     //το έχει βάλει εδώ ως παράδειγμα για να δούμε πως δουλεύει το log
    // })
  ],
});

module.exports = logger;
