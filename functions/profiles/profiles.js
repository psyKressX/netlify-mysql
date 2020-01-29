"use strict";
const sql = require('./sql');
require('dotenv').config();
const mysql = require("mysql");

exports.handler = async (event, context, callback) => {
  //uses sql module to query select all profiles
  try {     
    const data =await sql.query('SELECT * FROM profiles');
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  }
  catch(err) {
    callback(err);
  }
};
