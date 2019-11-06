/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import axios from 'axios'
import {BrowserRouter,Route,Switch,Link, withRouter } from 'react-router-dom'
import {Row, Col, Container, Button } from 'reactstrap'
import Logo from './../images/logo-site.png';
import Login from './../pages/Login'
import Home from './../pages/Home'


class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: {},
      token : localStorage.getItem('Authorization'),
      isLogin : false
    }
  }

  getData = async(page)=>{
    const job = await axios.get(page !== undefined ? page:'http://localhost:2000/user')
    return job.data  
  }
  
  componentDidMount(){
    this.getData().then(res => {
      this.setState({data : res.data})
      console.log(res.data)
    })
    if(this.state.token){
      this.setState({isLogin : true})
    }else{
      this.setState({isLogin : false})
    }
  }

  removeToken = () => {
    localStorage.removeItem('Authorization')
    this.props.history.push('/login')
    window.location.reload()
  }
  render(){
    return (
<nav className="navbar header-nav navbar-expand-lg bg-success">

<div className="container">
<Link to='/' className="navbar-brand"><img src={Logo} alt="image" width="120px"/></Link>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
<span class="navbar-toggler-icon"></span>
<span></span>
<span></span>
<span></span>
</button>
{!this.state.token&&(
    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
    <ul className="navbar-nav">
        <li className="nav-item active ">
         <Link to='/findjobs' className="nav-link text-light">Find Jobs</Link>
      </li>
      <li className="nav-item">
      <Link to='/blog' className="nav-link  text-light" >News</Link>
     </li>
      <li className="nav-item">
      <Link to='/about' className="nav-link  text-light" >About</Link>
      </li>
    </ul>
      <div className="my-2 my-lg-0">
      <Link to='/login'><button className="btn btn-link text-white " type="button" value="Login">Login</button></Link>
      <Link to='/signup'><input className="btn btn-dark btn-sm" type="button" value="Sign Up"></input></Link>
      <Link to='/signupcompany'><input className="btn btn-outline-light btn-sm" type="button" value="For Company"></input></Link>
     </div> 
       
    </div>
  )}
  {this.state.token&&(
     <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
     <ul className="navbar-nav">
     <li className="nav-item active">
      <Link to='/findjobs' className="nav-link text-light">Find Jobs</Link>
   </li>
   <li className="nav-item">
   <Link to='/blog' className="nav-link  text-light" href="#">News</Link>
  </li>
   <li className="nav-item">
   <Link to='/about' className="nav-link  text-light" href="#">About</Link>
   </li>

     </ul>
   <div className="my-2 my-lg-0">
   <Link to='/postjobs/crudjob' className="btn btn-danger btn-sm">Post Jobs</Link>  
   <Link to='/login'><button className="btn btn-dark btn-sm" type="button" value="Logout" onClick ={()=> this.removeToken()}>Logout</button></Link>
   </div>    
 </div>
  )}  
</div>
</nav>

    );
}

}

export default withRouter(Navbar); 