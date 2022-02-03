import mysql from "mysql";
import config from "../config/config";

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "c3bmei",
});

let databaseGetRecordArray = function (
  table: string,
  condition: Map<string, any>,
  sort: string,
  sortType: string
) {
  let sql = "";

  if (!condition) {
    console.log(`condition = null`);

    sql = `SELECT * FROM ${table}`;
  } else {
    let fieldsSQL = "";

    for (const [key, value] of condition.entries()) {
      fieldsSQL += `${key} = ${value} `;
    }

    sql = `SELECT * FROM ${table} WHERE ${fieldsSQL}`;
  }

  if (sort != "") {
    sql += ` ORDER BY ${sort}`;
    if (sortType == config.SORT_ASC) {
      sql += " ASC";
    } else if (sortType == config.SORT_DESC) {
      sql += " DESC";
    }
  }

//   console.log(`sql : ${sql}`);

  database.query(sql, function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    // console.log(fields)
    return results;
  });

};

export default {
  DATABASE: database,
  DATABASE_GET_RECORD_ARRAY: databaseGetRecordArray,
};
