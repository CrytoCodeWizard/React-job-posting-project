import React from 'react';
import './App.css';
import {Component} from 'react';
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom'
import Navbar from './components/Navbar'
import { Container, Row, Col } from 'reactstrap';

import Home from './pages/Home'
import About from './pages/About'
import PostJobs from './pages/PostJobs'
import FindJobs from './pages/FindJobs'
import Login from './pages/Login'
import Blog from './pages/Blog'
import Signup from './pages/Signup'
import Detail from './pages/Detail'
import SignUpCompany from './pages/SignUpCompany'
import ErroPage from './pages/Error' 
import Pic1 from './images/jobpic.png'

class App extends Component {

  componentWillMount(){

  }

  render(){
    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        
        <Switch>

        <Route path={"/"} component={Home} exact />
        <Route path={"/blog"} component={Blog} exact />
        <Route path={"/postjobs"} component={PostJobs} />

        <Route path={"/findjobs"} component={FindJobs} exact />
        <Route path={"/about"} component={About} exact />
        <Route path={"/login"} component={Login} exact />
        <Route path={"/signup"} component={Signup} exact />
        <Route path={"/signupcompany"} component={SignUpCompany} exact />
        <Route path='/detail/:id' component={Detail} exact />
        <Route component={ErroPage}/>
        </Switch>
        
        </BrowserRouter>
        

      </div>
    )
  }
} 

export default App;
