import React, { Component } from 'react';

class CreateProfile extends Component {
  //state that holds user input and the return values of the back end calls for errorMessage
  state={
    firstName: null,
    lastName: null,
    userName: null,
    email: null,
    gender: null,
    password: null,
    confirm: null,
    sumbitFail: false,
    formErrors:{
      success: null,
      firstName: null,
      lastName: null,
      userName:null,
      gender:null,
      email: null,
      password: null,
      confirm: null
    }
  }
//event that updates the state when value is changed in form feilds
  handleChange = e =>{
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value});
  }
//on submit sends the value from the state to the api and makes a post request to mysql
//api then returns form errors and sets them to the state
  handleSubmit = e =>{
    e.preventDefault();
    const { firstName, lastName, userName, gender, email, password, confirm } = this.state;
    fetch(`/.netlify/functions/create-profile`, {
      method: "POST",
      headers: {'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify({ firstName, lastName, userName, gender, email, password, confirm })
    }).then(
      res => res.json()
    )
    .then(res =>  {
      this.setState({ formErrors : res });
      this.props.refresh();
    })
  }


  render() {

    const formErrors = this.state.formErrors;

    return (

<form onSubmit={this.handleSubmit} className='p-4'>

<div className="primary-header brand">
  <h3>Registration Form</h3>
</div>

{formErrors.success !== null&&(
  <small className='successMessage'>{formErrors.success}</small>
)}

<div className="primary-body">

<div className="pb-2 row">
  <div className="form-group col-6">
    <input
      type="text"
      name="firstName"
      placeholder="First Name"
      className="form-control"
      maxLength='15'
      onChange={this.handleChange}
    />
    {formErrors.firstName !== null&&(
      <small className='errorMessage'>{formErrors.firstName}</small>
    )}
  </div>

  <div className="form-group col-6">
    <input
      type="text"
      name="lastName"
      placeholder="Last Name"
      className="form-control"
      maxLength='15'
      noValidate
      onChange={this.handleChange}
    />
    {formErrors.lastName !==null &&(
      <small className='errorMessage'>{formErrors.lastName}</small>
    )}
  </div>
</div>

<div className="form-group pb-2">
  <input
    type="text"
    name="userName"
    placeholder="Username"
    className="form-control"
    maxLength='15'
    noValidate
    onChange={this.handleChange}
  />
  {formErrors.userName !==null &&(
    <small className='errorMessage'>{formErrors.userName}</small>
  )}
</div>

<div className="form-group pb-2">
  <input
    type="text"
    name="email"
    placeholder="Email Address"
    className="form-control"
    maxLength='40'
    noValidate
    onChange={this.handleChange}
  />
  {formErrors.email !==null &&(
    <small className='errorMessage'>{formErrors.email}</small>
  )}
</div>

<div className="form-group pb-2">
  <select
    name="gender"
    className="form-control"
    onChange={this.handleChange}
    defaultValue='DEFAULT'
  >
    <option disabled hidden value='DEFAULT'>Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
    <option value="fake">fake</option>
  </select>
  {formErrors.gender !==null && (
    <small className='errorMessage'>{formErrors.gender}</small>
  )}
</div>

<div className="form-group pb-2">
  <small>8-15 characters, must include atleast 1 number.</small>
  <input
    type="password"
    name="password"
    placeholder="Password"
    className="form-control"
    maxLength='15'
    noValidate
    onChange={this.handleChange}
  />
  {formErrors.password !==null &&(
    <small className='errorMessage'>{formErrors.password}</small>
  )}
</div>

<div className="form-group pb-4">
  <input
    type="password"
    name="confirm"
    placeholder="Confirm Password"
    className="form-control"
    maxLength='15'
    noValidate
    onChange={this.handleChange}
  />
  {formErrors.confirm !==null && (
    <small className='errorMessage'>{formErrors.confirm}</small>
  )}
</div>

<div className="form-group pb-2 d-flex justify-content-end">
  <button className="btn btn-default btn-custom" action='onSubmit'>Register</button>
</div>

<small className='d-flex justify-content-end'>Already Have an Account?</small>

</div>

</form>


    );
  }

}

export default CreateProfile;
