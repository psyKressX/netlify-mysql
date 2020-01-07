const mysql = require("mysql");
const bodyParser = require('body-parser');
require('dotenv').config();

exports.handler = async (event, context, callback) => {

  const {MY_HOST, MY_USER, MY_PASS, MY_DB} =process.env;

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  else{

    const connection = mysql.createConnection({
      host: "sql12.freemysqlhosting.net",
      user: "sql12316942",
      password: "jFuH2feH39",
      database: "sql12316942"
    });

    connection.connect(function(error){
        if(!!error){
          console.log("error connecting")
        }else{
          console.log('connected');
        }
    });

    const fetchProfile = (param, feild) =>{
      return new Promise((res, reject)=>{
        connection.query(`SELECT * FROM profiles WHERE ${feild} = "${param}"`, (err, data)=>{
          if(err) {
            return reject(err)
          }
          else {
            return res(data)
          }
        })
      })
    }

    const send = body =>{
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(body)
      });
    }


    const body= JSON.parse(event.body);
    const { firstName, lastName, userName, gender, email, password, confirm} = body;
    let failed = false;
  // creates errorMessage from required validate, checks Regex, min max values ect. and returns relevent message
    const errorMessage = validate(body);
  //check if username or email already exists
    if(errorMessage.userName == null && errorMessage.email ==null){
      await fetchProfile(userName, "userName").then(res => {
        if(res.length > 0){
          errorMessage.userName = "user already exists";
        }
      })
      await fetchProfile(email, "email").then(res => {
        if(res.length > 0){
          errorMessage.email = "email already exists";
        }
      })
    }
    //checks if there are errors in error message and returns messages
    for(var msg in errorMessage) {
      if(errorMessage[msg] !== null){
        failed = true;
      }
    }
    //if it hasnt failed, insert new profile to mysql db
    if(failed == false){
      errorMessage.success= "Profile successfully added!";
      const INSERT_PROFILES_QUERY= `INSERT INTO profiles (firstName, lastName, userName, gender, email, password) VALUES ("${firstName}", "${lastName}", "${userName}", "${gender}", "${email}", "${password}")`;
      connection.query(INSERT_PROFILES_QUERY, (err, result) => {
        if(err) {
          return res.send(err);
          console.log(err);
        }
        else{
          console.log("profile added");
        }
      });
    }
    console.log(errorMessage);
    send(errorMessage);

    const validate = (x) => {
      const min3max15NN = (test) =>{
        return(
          (test===null) ? "feild required" :
          (test.length < 3)? 'minimum 3 characters required' :
          (test.length > 15)? 'maximum 15 characters' : null
        )
      }

      const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
      const passReq = RegExp(
        /(?=.*[a-z])(?=.*[1-9])[a-zA-Z1-9!?#$%^&*]/
      );
      const charsOnly =RegExp(
        /[A-Za-z]/
      )

      let formErrors = {
        success: null,
        firstName: null,
        lastName: null,
        userName: null,
        gender: null,
        email: null,
        password: null,
        confirm: null
      }

      formErrors.firstName = min3max15NN(x.firstName);

      formErrors.lastName = min3max15NN(x.lastName);

      formErrors.userName = min3max15NN(x.userName);

      formErrors.gender =
        (x.gender == null) ?
          "feild required" :
        (x.gender !== "male" && x.gender !== "female" && x.gender !== "other") ?
          "please select a  valid gender" :
        null
      ;

      formErrors.email =
        (x.email == null) ?
          "feild required" :
        (!emailRegex.test(x.email)) ?
          "please enter a valid email" :
        null
      ;

      formErrors.password =
        (x.password == null) ?
          "feild required" :
        (!passReq.test(x.password) && x.password.length >= 8 && x.password.length <15) ?
          "password must contain a combination of numbers and letters" :
        (x.password.length <7) ?
          "password must be a minimum length of 8" :
        (x.password.length > 15) ?
          "password must be a maximum of 15" :
        null
      ;

      formErrors.confirm =
        (x.password !== null && x.confirm !== x.password) ?
          "Confirm password does not match password" :
        null
      ;

      return formErrors;
    }

  }

}
