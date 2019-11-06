import React, {Component} from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Container} from 'reactstrap';

export default class UpdateCompany extends Component {
  constructor(props){
    super(props)
    this.state = {
      data : {},
      name : '',
      logo : '',
      description : '',
      location : '',
      id : props.match.params.id
    }

  }

  componentWillMount(){
    axios.get('http://localhost:2000/company/'+ this.state.id).then(res=>{
      this.setState({data: res.data.data[0]})
      console.log(res.data.data[0])
    })
  }
 
  updateCompany = async(id,datacompany) => {
    const user = await axios.patch(`http://localhost:2000/company/${id}`,(datacompany))
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
 
    const id = this.state.id

    const formData = new FormData();
    formData.append('name',event.target.name.value)
    formData.append('logo', event.target.logo.files[0])
    formData.append('location', event.target.location.value)
    formData.append('description', event.target.description.value)
 
  
     this.updateCompany(id,formData)
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
        <Input type="text" name="name" id="name" defaultValue={this.state.data.name} onChange={this.handlenameChange}  placeholder="Enter your name" required/>
      </FormGroup>
      <FormGroup>
        <Label for="logo">Logo</Label>
        <Input type="file" name="logo" id="logo" onChange={this.handleLogoChange} defaultValue={this.state.data.logo} placeholder="Enter your Logo" required/>
      </FormGroup>
      <FormGroup>
        <Label for="location">Location</Label>
        <Input type="text" name="location" id="location" onChange={this.handleLocationChange} defaultValue={this.state.data.location} placeholder="Enter your location" required/>
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="textarea" name="description" id="description" onChange={this.handleDescriptionChange} defaultValue={this.state.data.description} placeholder="Enter your company description" required/>
      </FormGroup>
      <Button className='button_login bg-success'>Submit</Button>
    </Form>
    </Container>
    </div>
  );
}
}