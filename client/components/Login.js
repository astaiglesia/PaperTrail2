import React, { Component } from 'react';
import { render } from 'react-dom';
// import { useMediaQuery } from 'react-responsive';
import "./styling.scss";
import { Link, Redirect } from "react-router-dom";

class Login extends Component {
  render() {
    if (this.props.state.user !== null) {
      return <Redirect to = '/Category'/>;
    }

    return (
      <div id='allLogin'>
        <div id='top'>
          <h1>Welcome to PaperTrail!</h1>
          <img id='logo' src="logo.png"/>
        </div>
        
        <form id="logForm" onSubmit={this.props.handleLogin}>
          <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Email Address"/>
          <input type="password" id="inputPassword" className="form-control" aria-describedby="passwordHelpInline" placeholder="Password"/>
          <div>
            <button id="log" type="submit" className='btn btn-primary'  
            onClick={this.props.handleLogin}>Login</button>
          </div>
          <Link to="/Users/createAccount">
            <button id="createAcc" type="button" className='btn btn-secondary'>Join Now!</button>
          </Link>
        </form>

      <div id="footer">
        <span>a catSnake product</span>
      </div>

      </div>
    );
  }
}


export default Login;