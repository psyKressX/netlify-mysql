"use strict";
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

const query = (string) => {
  return new Promise((res, reject)=>{
    pool.getConnection(function(err, conn){
      conn.release();
      if(err){
          return reject(err)
      }
      else{
        conn.query( string , (err, data)=>{
          if(err) {
            return reject(err)
          }
          else {
            return res(data)
          }
        });
      }
    })
  });
}

exports.query = query;
