/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react'
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom'
import axios from 'axios'
import {
    Spinner,Button,Container
  } from 'reactstrap';
  import { Form, FormGroup, Label, Input , Modal, ModalHeader, ModalBody} from 'reactstrap';
import UpdateCompany from './company/UpdateCompany' 

export default class CrudCompany extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen : false,
            isOpenUpdate : false,
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

    toggleUpdate = () => {
      this.setState({})
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
  
      
  
      buttonPress = async(page)=>{
        this.setState({isLoading:false}) 
        this.getData(page).then(data=>{
          this.setState({data,isLoading:false})
        })
      }  

      //update

      goToUpdate = (id)=>{
        this.setState({isOpenUpdate : !this.state.isOpen})
      }

      updateCompany = async(id,datacompany) => {
        const user = await axios.patch(`http://localhost:2000/company/${id}`,(datacompany))
        return user.data 
       }

       handleSubmitUpdate = event => {
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
      
      
      //end update


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
        <button type="button" className="btn btn-primary"  onClick={this.toggle} data-toggle="modal" style={{ marginLeft : '30px', marginTop : '10px', marginBottom : '10px' }}>
        <i className="fa fa-plus-square"> Add Data</i>
        </button>
        
      {this.state.isOpen &&(  
      <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="">
        <ModalHeader toggle={this.toggle}>ADD COMPANY</ModalHeader>
        <ModalBody>
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
        </ModalBody>
      </Modal>
 
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
        <Button className="card-text bg-success"  onClick={()=> this.goToUpdate(v.id)}><i className="fa fa-edit"> Update </i></Button>
        <Button className="card-text bg-danger"style={{ marginLeft : '10px' }} onClick={()=> this.deleteData(v.id)}><i className="fa fa-trash"> Delete </i></Button>
      </div>

    {/* update modal */}
    {this.state.isOpenUpdate &&(
    <Modal isOpen={this.state.isOpenUpdate} toggle={this.goToUpdate} className="">
        <ModalHeader toggle={this.goToUpdate}>Update COMPANY</ModalHeader>
        <ModalBody>
        <br></br>
        <Form id="register" method="post" onSubmit ={this.handleSubmitUpdate}>
        <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" id="name" defaultValue={v.name} onChange={this.handlenameChange}  placeholder="Enter your name" required/>
      </FormGroup>
      <FormGroup>
        <Label for="logo">Logo</Label>
        <Input type="file" name="logo" id="logo" onChange={this.handleLogoChange} defaultValue={v.logo} placeholder="Enter your Logo" required/>
      </FormGroup>
      <FormGroup>
        <Label for="location">Location</Label>
        <Input type="text" name="location" id="location" onChange={this.handleLocationChange} defaultValue={v.location} placeholder="Enter your location" required/>
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="textarea" name="description" id="description" onChange={this.handleDescriptionChange} defaultValue={v.description} placeholder="Enter your company description" required/>
      </FormGroup>
    <Button className='button_login bg-success'>Submit</Button>
</Form>
        </ModalBody>
      </Modal> 
  )}      
  </div>

   </div> 
  ))}
  </React.Fragment>

}




</Container>
 </div>

    
  
    )
    }
}