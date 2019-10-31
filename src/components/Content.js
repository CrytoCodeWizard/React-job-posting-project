import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import bgimage from './../images/jobpic.png'

const Content = (props) => {
  return (
    <div>
        
      <Jumbotron className="text-light" style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover' }}>
        <h1 className="display-3 text-center">WELCOME TO THIS SITE</h1>
        <p className="lead text-center"></p>
        <hr className="my-2" />
        <p className="text-center"></p>
        {/* <p className="lead text-center">
          <Link to='/home'><Button className="space-button btn btn-primary">Find Jobs</Button></Link>
          <Link to='/postjobs'><Button className="btn btn-success text-light">Post Jobs</Button></Link>
        </p> */}
      </Jumbotron>
      
    </div>
  );
};

export default Content;