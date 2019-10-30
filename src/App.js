import React from 'react';
import './App.css';
import {Component} from 'react';
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom'
import Navbar from './components/Navbar'
import { Container, Row, Col } from 'reactstrap';

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import PostJobs from './pages/PostJobs'
import Login from './pages/Login'
import Blog from './pages/Blog'
import Signup from './pages/Signup'
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
        <Route path={"/home"} component={Home} />
        <Route path={"/blog"} component={Blog} />
        <Route path={"/postjobs"} component={PostJobs} />
        <Route path={"/about"} component={About} />
        <Route path={"/login"} component={Login} />
        <Route path={"/signup"} component={Signup} />
        </Switch>
        
        </BrowserRouter>
        

      </div>
    )
  }
} 

export default App;
