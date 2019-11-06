import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios , { post } from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

export default class AddCompany extends Component {
  constructor(props){
    super(props)
    this.state = {
      data : {},
      name : '',
      logo : null,
      description : '',
      location : '',
    }
  }
 
  addCompany = async(datacompany) => {
    const user = await axios.post('http://localhost:2000/company',(datacompany))
    return user.data 
   }

   getData = ()=>{
    axios.get('http://localhost:2000/company').then(res => {
      this.setState({data: res.data})
    }) 
  }
 
   handlenameChange = event => {
    this.setState({ name: event.target.value });
  }

   handleDescriptionChange = event => {
     this.setState({ description: event.target.value });
   }

  handleLocationChange = event => {
    this.setState({ location: event.target.value });
  }

  handleLogoChange = event => {
    this.setState({ logo: event.target.files[0] });
  }

   handleSubmit = event => {
     event.preventDefault();
 
    const formData = new FormData();
    formData.append('name', event.target.name.value)
    formData.append('logo', event.target.logo.files[0])
    formData.append('location', event.target.location.value)
    formData.append('description', event.target.description.value)
 
     this.addCompany(formData)
       .then(res => {
        this.setState({data : res.data})
        alert('Success to Add Data Company')
        this.cancelCourse()
      }).catch((err) => {
         console.log(err)
         return
       })

       
   }

   cancelCourse = () => { 
    document.getElementById("register").reset();
  }

  render(){
  return (
    <div className='Login-design text-dark shadow p-3 mb-5'>
    <Container>  
    <Label for="register" className='button_login text-center'>ADD COMPANY</Label>
    <br></br>
    <Form id="register" method="post" onSubmit ={this.handleSubmit}>
    <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" id="name" onChange={this.handlenameChange} placeholder="Enter your name" required/>
      </FormGroup>
      <FormGroup>
        <Label for="logo">Logo</Label>
        <Input type="file" name="logo" id="logo" onChange={this.handleLogoChange} placeholder="Enter your Logo" required/>
      </FormGroup>
      <FormGroup>
        <Label for="location">Location</Label>
        <Input type="text" name="location" id="location" onChange={this.handleLocationChange} placeholder="Enter your location" required/>
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="textarea" name="description" id="description" onChange={this.handleDescriptionChange} placeholder="Enter your company description" required/>
      </FormGroup>
      <Button className='button_login bg-success'>Submit</Button>
    </Form>
    </Container>
    </div>
  );
}
}