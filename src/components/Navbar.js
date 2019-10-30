/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom'
import {Row, Col, Container, Button} from 'reactstrap'
import Logo from './../images/logo-site.png';
import Login from './../pages/Login'
import Home from './../pages/Home'


function Navbar() {
    return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow">
  <Link to='/home' className="navbar-brand"><img src={Logo} alt="logo" width="120px"></img></Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link to='/home' className="nav-link">Find Jobs</Link>
      </li>
      <li className="nav-item">
      <Link to='/postjobs' className="nav-link">Post Jobs</Link>
      </li>
      <li className="nav-item">
       <Link to='/blog' className="nav-link" href="#">News</Link>
      </li>
      <li className="nav-item">
      <Link to='/about' className="nav-link" href="#">About</Link>
      </li>
    </ul>
    <div className="my-2 my-lg-0">
     <Link to='/login'><button className="btn btn-outline-light btn-sm" type="button" value="Login">Login</button></Link>
      <Link to='/signup'><input className="btn btn-dark btn-sm" type="button" value="Sign Up"></input></Link>
    </div>
  </div>
</nav>
    );
}


export default Navbar; 