const mysql = require("mysql");
require('dotenv').config();

exports.handler = (event, context, callback) => {

  const { MY_HOST, MY_USER, MY_PASS, MY_DB } = process.env;

  const connection = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12316942",
    password: "jFuH2feH39",
    database: "sql12316942"
  });
  
  const send = (body) =>{
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body)
    });
  }

  connection.connect(function(error){
      if(!!error){
        console.log("error connecting");
        send(error)
      }else{
        console.log('connected');
        send('connected');
      }
  });
}
