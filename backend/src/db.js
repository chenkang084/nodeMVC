// const Sequelize = require('sequelize');
// const mongoose = require('mongoose');
// const mysql = require('mysql');

export default (callback) => {
  // connect to a database if needed, then pass it to `callback`:
  // let _mysql = mysql.createPool({
  //   host: "localhost",
  //   user: "root",
  //   password: "root",
  //   database: "game",
  //   connectionLimit: 10
  // });

  // _mysql.getConnection(function(err, connection) {
  //   if (err) throw err;
  //   console.log("db connected!");
  // });

  // mongoose.connect(
  //   "mongodb://127.0.0.1/node_club_dev",
  //   {
  //     server: { poolSize: 4 }
  //   },
  //   function(err) {
  //     if (err) {
  //       // logger.error("connect to %s error: ", config.db, err.message);
  //       process.exit(1);
  //     }

  //     console.log("mongooDB connected!");
  //   }
  // );


  // let db = {
  //   mysql: _mysql || {},
  //   mongoose
  // };

  const db = {};

  callback(db);
};
