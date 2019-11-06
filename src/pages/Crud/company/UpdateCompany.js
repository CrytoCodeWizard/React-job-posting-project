import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios , { post } from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText,Spinner } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

export default class UpdateCompany extends Component {
  constructor(props){
    super(props)
    this.state = {
      data : {},
      name : '',
      logo : '',
      description : '',
      location : '',
    }

  }

  componentWillMount(){
    axios.get('http://localhost:2000/company/'+ this.props.match.params.id).then(res=>{
      this.setState({data: res.data.data[0]})
      console.log(res.data.data[0])
    })
  }
 
  updateCompany = async(datacompany) => {
    const user = await axios.patch('http://localhost:2000/company',(datacompany))
    return user.data 
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
    this.setState({ logo: event.target.files[0]});
  }

   handleSubmit = event => {
     event.preventDefault();
 
    const formData = new FormData();
    formData.append('name',this.handlenameChange)
    formData.append('logo', this.handleLogoChange)
    formData.append('location', this.handleLocationChange)
    formData.append('description', this.handleDescriptionChange)
 
     this.updateCompany(formData)
       .then(res => {
         console.log(res.status);
         console.log(res.data)
       }).catch((err) => {
         console.log(err)
         return
       })
   }


  render(){
  return (
    <div className='Login-design text-dark shadow p-3 mb-5'>
    <Container>  
    <Label for="updatecompany" className='button_login text-center'>EDIT COMPANY</Label>
    <br></br>
    <Form id="updatecompany" method="post" onSubmit ={this.handleSubmit}>
    <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" id="name" value={this.state.data.name} onChange={this.handlenameChange}  placeholder="Enter your name" required/>
      </FormGroup>
      <FormGroup>
        <Label for="logo">Logo</Label>
        <Input type="file" name="logo" id="logo" onChange={this.handleLogoChange} placeholder="Enter your Logo" required/>
      </FormGroup>
      <FormGroup>
        <Label for="location">Location</Label>
        <Input type="text" name="location" id="location" onChange={this.handleLocationChange} value={this.state.data.location} placeholder="Enter your location" required/>
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="textarea" name="description" id="description" onChange={this.handleDescriptionChange} value={this.state.data.description} placeholder="Enter your company description" required/>
      </FormGroup>
      <Button className='button_login bg-success'>Submit</Button>
    </Form>
    </Container>
    </div>
  );
}
}