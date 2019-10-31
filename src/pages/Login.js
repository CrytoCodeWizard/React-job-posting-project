import React,{Component} from 'react';
import './../App.css'
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      data : {},
      isLoading : true,
      isError : '',
      email : '',
      password : '',
      token : ''
    }
  }

  async componentDidMount(){
    await localStorage.getItem('Authorization')
    
  }

  getLogin = async(account) => {
   const user = await axios.post('http://localhost:2000/user/login',(account))
   return user.data 
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const account = {
      email: this.state.email,
      password : this.state.password
    };

    this.getLogin(account)
      .then(res => {
        console.log(res.status);
        console.log(res.token);
        if(res.status === 200){
          this.props.history.push('/home');
          localStorage.setItem('Authorization',res.token)
          // window.location.reload()
        }
      }).catch((err) => {
        console.log(err)
        return
      })
  }

  render() {
  return (
    <div className='Login-design bg-dark text-light shadow p-3 mb-5'>
    <Container>
    <Label for="title" className='button_login text-center'>LOGIN</Label>
    <Row>
    <Col>
    <Form id="loginForm" method="post" onSubmit ={this.handleSubmit}>
      <FormGroup>
        <Label for="email"> Email</Label>
        <Input type="email" name="email" id="email" onChange={this.handleEmailChange} placeholder="Enter your Email" required/>
      </FormGroup>
      <FormGroup>
        <Label for="Password"> Password</Label>
        <Input type="password" name="password" id="Password"  onChange={this.handlePasswordChange} placeholder="Enter your Password" required/>
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
}