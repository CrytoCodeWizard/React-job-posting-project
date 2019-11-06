import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText,Spinner } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

export default class UpdateJob extends Component {
  constructor(props){
    super(props)
    this.state = {
      data : {},
      name : '',
      description : '',
      id_category : '',
      salary : '',
      location : '',
      id_company: ''
    }
  }
 
  componentDidMount(){
    axios.get('http://localhost:2000/job/'+ this.props.match.params.id).then(res=>{
      this.setState({data: res.data.data[0]})
      console.log(res.data.data)
    })
  }

  UpdateJob = async(dataJob) => {
    const user = await axios.patch('http://localhost:2000/job',(dataJob))
    return user.data 
   }
 
   handlenameChange = event => {
    this.setState({ name: event.target.value });
  }

   handleDescriptionChange = event => {
     this.setState({ description: event.target.value });
   }
 
   handleCategoryChange = (event) => {
     this.setState({ id_category: event.target.value });
   }

   handleSalaryChange = event => {
    this.setState({ salary: event.target.value });
  }

  handleLocationChange = event => {
    this.setState({ location: event.target.value });
  }

  handleCompanyChange = event => {
    this.setState({ id_company: event.target.value });
  }
 
   handleSubmit = event => {
     event.preventDefault();
 
     const dataJob = {
       name : this.state.name,
       description: this.state.description,
       id_category : this.state.id_category,
       salary : this.state.salary,
       location : this.state.location,
       id_company : this.state.id_company
     };
 
     this.UpdateJob(dataJob)
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
    {!this.state.data.id&&(     
        <React.Fragment>
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
        </React.Fragment>
    )}
    <Container>  
    <Label for="register" className='button_login text-center'>EDIT JOB</Label>
    <br></br>
    {this.state.data.id&&(
    <Form id="register" method="post" onSubmit ={this.handleSubmit}>
    <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" id="name" onChange={this.handlenameChange}  value={this.state.data.name} placeholder="Enter your name" required/>
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="textarea" name="description" id="description" onChange={this.handleDescriptionChange} value={this.state.data.description} placeholder="Enter your job description" required/>
      </FormGroup>
      <FormGroup>
        <Label for="id_category">ID Category</Label>
        <Input type="number" name="id_category" id="id_category" onChange={this.handleCategoryChange} value={this.state.data.id_category} placeholder="Enter your id category" required/>
      </FormGroup>
      <FormGroup>
        <Label for="salary">Salary</Label>
        <Input type="number" name="salary" id="salary" onChange={this.handleSalaryChange} value={this.state.data.salary} placeholder="Enter your salary" required/>
      </FormGroup>
      <FormGroup>
        <Label for="location">Location</Label>
        <Input type="text" name="location" id="location" onChange={this.handleLocationChange} value={this.state.data.location} placeholder="Enter your salary" required/>
      </FormGroup>
      <FormGroup>
        <Label for="id_company">ID Company</Label>
        <Input type="text" name="id_company" id="id_company" onChange={this.handleCompanyChange} value={this.state.data.company} placeholder="Enter your salary" required/>
      </FormGroup>
      <Button className='button_login bg-success'>Submit</Button>
    </Form>
    )}
    </Container>
    </div>
  );
}
}