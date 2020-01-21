"use strict";
const sql = require('./sql');

exports.handler = async (event, context, callback) => {
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
