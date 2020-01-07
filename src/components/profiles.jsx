import React, { Component } from 'react';
import Row from './tableRow';

class Profiles extends Component {
  constructor() {
    super();
    this.state = {
      profiles: []
    }
  }
  fetchProfiles= () =>{
    fetch('/.netlify/functions/profiles')
      .then(res => res.json())
      .then(data => {
        this.setState({profiles : data})
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchProfiles();
  }
  componentWillUpdate(pP) {
    if(pP.fetch){
      this.fetchProfiles();
      this.props.refreshed();
    }
  }


  render() {
    return (
      <div>
        <h4>MySQL Profiles</h4>
        <table>
          <thead>
            <tr>
              <td className="col-md-2">ID</td>
              <td className="col-md-2">firstName</td>
              <td className="col-md-2">lastName</td>
              <td className="col-md-2">userName</td>
              <td className="col-md-2">email</td>
              <td className="col-md-2">gender</td>
              <td className="col-md-2">password</td>
            </tr>
          </thead>
          <tbody>
            {this.state.profiles.map(list =>(
              <Row
                key={list.userID}
                firstName={list.firstName}
                lastName={list.lastName}
                userName={list.userName}
                email={list.email}
                gender={list.gender}
                password={list.password}
                id={list.userID}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

}

export default Profiles;
