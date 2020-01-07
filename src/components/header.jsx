import React, { Component } from 'react';


class Header extends Component {

  render() {
    return (
      <header >
        <nav className="navbar navbar-dark bg-dark justify-content-between">
          <div>
            <i className="fa fa-globe p-2"></i>
            <p className="navbar-brand">Liams serverless Netlify MySQL</p>
          </div>
          <div>
            <ul style={{display: "inline-block"}} className= "nav navbar-nav navbar-right">
              <li style={{display: "inline-block"}} className="nav-item mr-3">Profiles</li>
              <li style={{display: "inline-block"}} className="nav-item"><span><i className="fa fa-user-circle"></i></span></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }

}

export default Header;
