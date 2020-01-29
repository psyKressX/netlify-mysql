"use strict";
const sql = require("./sql");
const bodyParser = require('body-parser');
const mysql = require("mysql");
const validate = require('./accountValidation.js');

exports.handler = async (event, context, callback) => {
  try {
    //test to see it is a post request
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
    else{
      const body= JSON.parse(event.body);
      const { firstName, lastName, userName, gender, email, password, confirm} = body;
      let failed = false;
      // creates errorMessage from "required" validate, checks Regex, min max values ect. and returns relevent message
      const errorMessage = validate.valid(body);
      //check if username or email already exists
      if(errorMessage.userName == null && errorMessage.email ==null){
        await sql.query(`SELECT * FROM profiles WHERE userName = "${userName}"`).then(res => {
          if(res.length > 0){
            errorMessage.userName = "user already exists";
          }
        });
        await sql.query(`SELECT * FROM profiles WHERE email = "${email}"`).then(res => {
          if(res.length > 0){
            errorMessage.email = "email already exists";
          }
        });
      }
      //checks if there are errors in error message
      for(var msg in errorMessage) {
        if(errorMessage[msg] !== null){
          failed = true;
        }
      }
      //if it hasnt failed, insert new profile to mysql db then creates success message
      if(failed == false){
        await sql.query(`INSERT INTO profiles (firstName, lastName, userName, gender, email, password) VALUES ("${firstName}", "${lastName}", "${userName}", "${gender}", "${email}", "${password}")`)
        .then(()=>{
          console.log("await3");
          errorMessage.success="profile successfully added";
        })
      }
      console.log('after awaits');
      return {
        statusCode: 200,
        body : JSON.stringify(errorMessage)
      }
    }
  } catch(err) {
    callback(err);
  }
};
