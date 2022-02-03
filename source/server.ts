import http from 'http'
import express from 'express'
import logging from './config/logging'
import config from './config/config'
import mainRoutes from './routes/main'

const NAMESPACE = 'Server'
const router = express()

/* Logging the request */
router.use((req, res, next) => {
    logging.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}] - IP - [${req.socket.remoteAddress}]`
    );
  
    res.on("finish", () => { //listener when this response is finish
      logging.info(
        NAMESPACE,
        `METHOD - [${req.method}], URL - [${req.url}] - IP - [${req.socket.remoteAddress}] , STATUS - [${res.statusCode}]`
      );
    });
  
    next();
  });

// Parse the request
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//Rule of API
router.use((req, res, next) => {
    // Website you wish to allow to connect
    res.header("Access-Control-Allow-Origin", "*"); //mean request can come from anywhere -> not good for production
    // Request headers you wish to allow
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With , Content-Type , Accept , Authorization"
    );
  
    if (req.method == "OPTIONS") {
      // Request methods you wish to allow
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      return res.status(200).json({});
    }
  
    next();
  });

//Routes
router.use('/main' , mainRoutes);


  /* Error Handling */
router.use((req, res, next) => {
    const error = new Error("not found");
  
    return res.status(404).json({
      message: error.message,
    });
  });

  /* Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.SERVER.port, () =>
  logging.info(
    NAMESPACE,
    `Server running on ${config.SERVER.hostname}:${config.SERVER.port}`
  )
);
