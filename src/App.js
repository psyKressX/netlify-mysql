import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/header';
import CreateProfile from './components/createProfile';
import Profiles from './components/profiles';

class App extends Component {
  //basic refresh param for updating the profiles table
  state={
    isFetching: false
  }
  refresh = () =>{
    this.setState({ isFetching : true });
  }
  refreshed = () =>{
    this.setState({ isFetching : false });
  }

  render(){
    return (
      <div className="App">
        <Header />
        <div id="primary" className='container d-flex justify-content-center'>
          <Profiles fetch={this.state.isFetching} refreshed={this.refreshed}/>
          <CreateProfile refresh={this.refresh} />
        </div>
      </div>
    );
  }
}

export default App;
