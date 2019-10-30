import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import bgimage from './../images/jobpic.png'

const Content = (props) => {
  return (
    <div>
        
      <Jumbotron className="text-light" style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover' }}>
        <h1 className="display-3 text-center">WELCOME TO THIS SITE</h1>
        <p className="lead text-center">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr className="my-2" />
        <p className="text-center">It uses utility class for typography and spacing to space content out within the larger container.</p>
        <p className="lead text-center">
          <Link to="/home"><Button className="space-button btn btn-primary">Find Jobs</Button></Link>
          <Link to="/postjobs"><Button className="btn btn-success text-light">Post Jobs</Button></Link>
        </p>
      </Jumbotron>
      
    </div>
  );
};

export default Content;