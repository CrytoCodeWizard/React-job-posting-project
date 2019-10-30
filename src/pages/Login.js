import React from 'react';
import './../App.css'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';

const Login = (props) => {
  return (
    <div className='Login-design bg-dark text-light shadow p-3 mb-5'>
    <Container>
    <Label for="title" className='button_login text-center'>LOGIN</Label>
    <Row>
    <Col>
    <Form>
      <FormGroup>
        <Label for="email"> Email</Label>
        <Input type="email" name="email" id="email" placeholder="Enter your Email" required/>
      </FormGroup>
      <FormGroup>
        <Label for="Password"> Password</Label>
        <Input type="password" name="password" id="Password" placeholder="Enter your Password" required/>
      </FormGroup>
      <Label>Don't have an account?</Label><Link to='/signup'> Register</Link>
      <Button className='button_login bg-success'>SIGN IN</Button>
    </Form>
    </Col>
    </Row>
    </Container>
    </div>
  );
}

export default Login;