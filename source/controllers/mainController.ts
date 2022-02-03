import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import config from "../config/config";
import db from "../config/db";

const NAMESPACE = "Main Controller";

const slideshow = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Main route called.");

  

  db.DATABASE.connect(function (err) {
    if (err)
      return res.status(404).json({
        message: "cannot connect to server",
      });
  });
  
  let condition = new Map();
  condition.set("visible", 1);

  let data = db.DATABASE_GET_RECORD_ARRAY(
    "slide_shows",
    condition,
    "sequence",
    config.SORT_ASC
  );

  db.DATABASE.end();

  return res.status(200).json({
    data: data,
  });
};

export default { slideshow };
