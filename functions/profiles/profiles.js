"use strict";
const sql = require('./sql');
require('dotenv').config();

exports.handler = async (event, context, callback) => {
  try {
    const {MY_HOST1} = process.env;
    console.log(MY_HOST1);
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
