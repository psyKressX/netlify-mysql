require('dotenv').config();
const mysql = require("mysql");

exports.handler = (event, context, callback) => {

  const { MY_HOST, MY_USER, MY_PASS, MY_DB } = process.env;

  const connection = mysql.createConnection({
    // host: "sql12.freemysqlhosting.net",
    // user: "sql12316942",
    // password: "jFuH2feH39",
    // database: "sql12316942"
    host: "localhost",
    user: "root",
    password: "getinzachopa123",
    database: "new_schema"
  });

  connection.connect(function(error){
      if(!!error){
        console.log("error connecting")
      }else{
        console.log('connected')
      }
  });

  const send = body =>{
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body)
    });
  }

  connection.query('SELECT * FROM profiles', function (error, results, fields) {
    if (error) throw error;
    else {
      send(results);
    }
  });
};
