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

  componentDidMount(){
    axios.get('http://localhost:2000/company/'+ this.props.match.params.id).then(res=>{
      this.setState({data: res.data.data[0]})
      console.log(res.data.data)
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
    formData.append('name', event.target.name.value)
    formData.append('logo', event.target.logo.files[0])
    formData.append('location', event.target.location.value)
    formData.append('description', event.target.description.value)

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    //  const datacompany = {
    //    name : this.state.name,
    //    logo : this.state.logo,
    //    location : this.state.location,
    //    description: this.state.description,
    //  };
 
     this.updateCompany(formData)
       .then(res => {
         console.log(res.status);
         console.log(res.data)
        //  if(res.send === 'Unauthorized'){
        //    setTimeout(() => {
        //     this.props.history.push('/login');
        //    },3000)
        //   //  localStorage.getItem('Authorization',res.token)
        //    // window.location.reload()
        //  }else{

        //  }
        window.location.reload()
       }).catch((err) => {
         console.log(err)
         return
       })
   }


  render(){
  return (
    <div className='Login-design bg-dark text-light shadow p-3 mb-5'>
    {!this.state.data.id&&(     
        <React.Fragment>
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
        </React.Fragment>
    )}
    <Container>  
    <Label for="register" className='button_login text-center'>EDIT COMPANY</Label>
    <br></br>
    {this.state.data.id&&(
    <Form id="register" method="post" onSubmit ={this.handleSubmit}>
    <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" id="name" onChange={this.handlenameChange} value={this.state.data.name} placeholder="Enter your name" required/>
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
    )}
    </Container>
    </div>
  );
}
}