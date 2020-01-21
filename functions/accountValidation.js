const valid = function( x ){

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


exports.valid = valid;
