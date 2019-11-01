import React from 'react';
import { BrowserRouter,Route,Switch,Link } from 'react-router-dom'
import { Col, Button, Form, FormGroup, Label, Input, FormText,Card,  Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Container, Row } from 'reactstrap';

import CrudCompany from './Crud/CrudCompany'
import CrudJob from './Crud/CrudJob'
import Footer from './../components/Footer'

const Signup = (props) => {
  return (
    
    <div>
     <BrowserRouter>
     <div>
      <Breadcrumb tag="nav" listTag="div">
      <BreadcrumbItem tag="a" href="#"><Link to='/postjobs/crudjob'>Job</Link></BreadcrumbItem>
        <BreadcrumbItem tag="a" href="#"><Link to='/postjobs/crudcompany'>Company</Link></BreadcrumbItem>
      </Breadcrumb>
    </div>  
    <Switch>
        <Route path={'/postjobs/crudcompany'} component={CrudCompany}></Route>
        <Route path={'/postjobs/crudjob'} component={CrudJob}></Route>
    </Switch>
    </BrowserRouter>
    <Footer/>

    </div>
    
    
  );
}

export default Signup;