import React, { Component } from 'react';
//simple table row rendering component
class Row extends Component {

  render() {

    const { firstName, lastName, userName, gender, password, id, email} = this.props

    return (
      <tr >
        <th className="col-md-2">{id}</th>
        <td className="col-md-2">{firstName}</td>
        <td className="col-md-2">{lastName}</td>
        <td className="col-md-2">{userName}</td>
        <td className="col-md-2">{email}</td>
        <td className="col-md-2">{gender}</td>
        <td className="col-md-2">{password}</td>
      </tr>
    );
  }

}

export default Row;
