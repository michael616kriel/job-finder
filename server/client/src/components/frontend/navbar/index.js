import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './styles.scss';
import {AppContext} from "../../../components/AppContext";

class Navbar extends Component {

  constructor(props){
    super(props)
    
  }

  componentDidMount(){
    console.log('nav props', this.context)
  }

  logout(){
    this.context.logout()
  }

  renderSignin(){
    const { user, authenticated } = this.context
    console.log('this.context', this.context)
    if(!authenticated || !user){
      const menuItems = [
        <li className="nav-item" key='signin'>
          <Link to="/login" className="nav-link" >Sign In</Link>
        </li>,
        <li className="nav-item" key='signup'>
          <Link to="/signup" className="nav-link" >Sign Up</Link>
        </li>
      ]
      return menuItems
    }else if(user && authenticated){
      return (
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {user.username}
          </a>
          <div className="dropdown-menu" aria-labelledby="dropdown01">
            <Link to={`/admin/profiles/${user.type}`} className="dropdown-item">{(user.type === 'applicant') ? 'Profile' : 'Dashboard'}</Link>
            <a className="dropdown-item" href="#" onClick={() => this.logout()}>Signout</a>
          </div>
        </li>
      )
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow site-nav">
        <div className="container">
          <Link to="/" className="navbar-brand">Job Finder</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
                <Link to="/" className="nav-link" >Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/jobs" className="nav-link" >Jobs</Link>
              </li>
              {this.renderSignin()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
Navbar.contextType = AppContext;

export default Navbar;
