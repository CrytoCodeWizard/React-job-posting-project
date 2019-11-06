/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react'
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom'
import axios from 'axios'
import {
    Spinner,Button,Container
  } from 'reactstrap';
  import { Form, FormGroup, Label, Input} from 'reactstrap';

import AddCompany from './company/AddCompany' 
import UpdateCompany from './company/UpdateCompany' 

export default class CrudCompany extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen : false,
            data : {},
            isLoading : true,
            next: false,
            previous: '',
            tot : '',
            mQuery : '',
            queryName : '',
            queryCompany : ''
        }
    }

    toggle = () => {
      this.setState({isOpen : !this.state.isOpen})
    }

    componentDidMount(){
        this.getData();
        }
  
      getData = ()=>{
        axios.get('http://localhost:2000/company').then(res => {
          this.setState({data: res.data ,isLoading: false})
        }) 
      }
      
      deleteData = (id)=>{
        axios.delete(`http://localhost:2000/company/${id}`).then(data=>{
          this.setState({isLoading:false})
          this.getData()
        }).catch(err => {
          console.log(err)
        })
        
      }
  
      goToUpdate = (id)=>{
        this.props.history.push('/postjobs/crudcompany/updatecompany/'+ id)
      }
  
      buttonPress = async(page)=>{
        this.setState({isLoading:false}) 
        this.getData(page).then(data=>{
          this.setState({data,isLoading:false})
        })
      }  

      //add data
      addCompany = async(datacompany) => {
        const user = await axios.post('http://localhost:2000/company',(datacompany))
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
            // this.setState({data : res.data})
            alert('Success to Add Data Company')
            this.getData()
            this.cancelCourse()
            this.setState({isOpen : false})
          }).catch((err) => {
             console.log(err)
             return
           })  
       }
    
       cancelCourse = () => { 
        document.getElementById("register").reset();
      }
      //end add data
  
    render(){
    return (
        <div>
          <Container>
          <BrowserRouter>

        <button type="button" className="btn btn-primary"  onClick={this.toggle} data-toggle="modal" style={{ marginLeft : '30px', marginTop : '10px', marginBottom : '10px' }}>
        Add Data
        </button>
        <Switch>
        <Route path={'/postjobs/crudcompany/updatecompany/:id'} component={UpdateCompany}></Route>
        </Switch> 
        {this.state.isOpen &&(  

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

        )}

        {this.state.isLoading&&(
        <div><Spinner style={{ width: '3rem', height: '3rem' }} type="grow" /></div>
      )}

    {!this.state.isLoading&&
    
    <React.Fragment>
    { 
      this.state.data.data.map((v,i)=>(  

    <div className="row no-gutters shadow-lg p-3 mb-5 bg-white rounded" key={i.toString()} >
      {/*  */}
    <div className="col-md-4">
      <img  src={v.logo} className="card-img App-img" alt={v.name} width="120px" height="160px"/>
    </div>
    
      <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title" >{v.name}</h5>
        <p className="card-text"><small className="text-muted">{v.location}</small></p>
        <p className="card-text">{v.description}</p>
        <Link to={'/postjobs/crudcompany/updatecompany/' + v.id}><Button className="card-text bg-success"  onClick={()=> this.goToUpdate(v.id)}>Update</Button></Link>
        <Button className="card-text bg-danger"style={{ marginLeft : '10px' }} onClick={()=> this.deleteData(v.id)}>Delete</Button>
      </div>
    </div>

   </div> 
  ))}
  </React.Fragment>

}
</BrowserRouter>
</Container>
 </div>

    
  
    )
    }
}