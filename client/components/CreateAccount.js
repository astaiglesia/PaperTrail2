import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import Category from './Category'
// import { useMediaQuery } from 'react-responsive';
import "./styling.scss";
// import logo from './logo.png';
import {
  Redirect,
  Route,
  Link,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";

class CreateAccount extends Component {
  render() {
    if (this.props.state.user !== null) {
      return <Redirect to = '/Category'/>;
    }

    return (
        <div id='allCreate'>
          <div id='createTop'>
            <h1>Create Account</h1>
            </div>

          <form id="createForm" onSubmit={this.props.handleCreation}> 
              <input type="text" className="form-control" id="inputFullName" aria-describedby="fullNameHelp" placeholder="Full Name"/>
              <input type="text" className="form-control" id="inputUserName" aria-describedby="userNameHelp" placeholder="Username"/>
              <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Email Address"/>
              <input type="password" id="inputPassword" className="form-control" aria-describedby="passwordHelpInline" placeholder="Password"/>
          </form>

          <div id="submission">
            <button id="createacc" type="Submit" className='btn btn-secondary'  onClick={this.props.handleCreation}>Create Account</button>
            <Link to = "/" style = {styles.container}>
              <button className='btn btn-secondary' style = {styles.container}>
                Back to Home
              </button>
            </Link>
          </div>
        </div>
    );
  }
}

const styles = {
  container: {
    color: "white",
    textDecoration: "none",
  }
}

export default CreateAccount; 