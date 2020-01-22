const mysql = require("mysql");
require('dotenv').config();
const {MY_HOST1, MY_USER1, MY_PASS1, MY_DB1} = process.env;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: MY_HOST1,
  user: MY_USER1,
  password: MY_PASS1,
  database: MY_DB1
});

exports.handler = async (event, context) => {
  try {
    const query = () => {
      return new Promise((res, reject)=>{
        pool.getConnection(function(err, conn){
          if(err){
              return reject(err)
          }
          else{
            return res(conn);
            conn.release();
          }
        })
      });
    }
    return {
      statusCode: 200,
      body: JSON.stringify(query)
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
