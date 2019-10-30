import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

const Signup = (props) => {
  return (
    <div className='Login-design bg-dark text-light shadow p-3 mb-5'>
    <Container>  
    <Label for="register" className='button_login text-center'>REGISTER</Label>
    <br></br>
    <Form>
    <FormGroup>
        <Label for="username">Username</Label>
        <Input type="text" name="username" id="username" placeholder="Enter your Username" required/>
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="email" id="email" placeholder="Enter your Email" required/>
      </FormGroup>
      <FormGroup>
        <Label for="Password">Password</Label>
        <Input type="password" name="password" id="Password" placeholder="Enter your Password" required/>
      </FormGroup>
      <Label>Already has an account?</Label><Link to='/login'> Sign in</Link>
      <Button className='button_login bg-success'>SIGN UP</Button>
    </Form>
    </Container>
    </div>
  );
}

export default Signup;