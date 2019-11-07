/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react'
import axios from 'axios'
import {
    Spinner,Button, Modal, ModalHeader, ModalBody
  } from 'reactstrap';
import { Container } from 'reactstrap';
import {  Form, FormGroup, Label, Input} from 'reactstrap';
import {connect} from 'react-redux'
import {addJob} from './../../redux/action/job'
import {getJob} from './../../redux/action/job'
import {updateJob} from './../../redux/action/job'
import {deleteJob} from './../../redux/action/job'

class CrudJob extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen : false,
            isUpdateOpen : false,
            data : {},
            isLoading : true,
            next: false,
            previous: '',
            tot : '',
        }
    }

    toggle = () => {
      this.setState({
        isOpen : !this.state.isOpen,
      })
    }

    componentDidMount(){
        this.getData()
        }

        toggleupdate = (id)=>{
          this.setState({isOpenUpdate : !this.state.isOpenUpdate,id})
        }

  
      buttonPress = async(page)=>{
        this.setState({isLoading:false}) 
        this.getData()
      }  

      // getData = ()=>{
      //   axios.get('http://localhost:2000/job').then(res => {
      //     this.setState({data: res.data ,next:res.next,previous:res.prev,tot : res.total_data,isLoading:false})
      //   }) 
      // }
      getData = async() => {
        await this.props.dispatch(getJob())
      }
      
      // deleteData = (id)=>{
      //   axios.delete(`http://localhost:2000/job/${id}`).then(data=>{
      //     this.setState({isLoading:false})
      //     this.getData()
      //   }).catch(err => {
      //     console.log(err)
      //   })
        
      // }

      deleteData = async(id) => {
        if (window.confirm('Are you sure you want to save this thing into the database?')) {
        await this.props.dispatch(deleteJob(id))
      }else{
        this.getData()
      }
      }

      // addJob = async(dataJob) => {
      //   const user = await axios.post('http://localhost:2000/job',(dataJob))
      //   return user.data 
      //  }

      addJob = async(dataJob) => {
        await this.props.dispatch(addJob(dataJob))
      }
     
       handlenameChange = event => {
        this.setState({ name: event.target.value });
      }
    
       handleDescriptionChange = event => {
         this.setState({ description: event.target.value });
       }
     
       handleCategoryChange = event => {
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
     
         this.addJob(dataJob)
           .then(res => {
             alert('Success Insert Data')
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
   
      // UpdateJob = async(id,dataJob) => {
      //   const user = await axios.patch(`http://localhost:2000/job/${id}`,(dataJob))
      //   return user.data 
      //  }


      UpdateJob = async(id,dataJob) => {
        await this.props.dispatch(updateJob(id,dataJob))
      }

      handleSubmitUpdate = event => {
        event.preventDefault();
    
        const id = this.state.id
   
        const dataJob = {
          name : this.state.name,
          description: this.state.description,
          id_category : this.state.id_category,
          salary : this.state.salary,
          location : this.state.location,
          id_company : this.state.id_company
        };
    
        this.UpdateJob(id,dataJob)
          .then(res => {
            alert('Success to Update')
            this.getData()
            this.setState({isOpenUpdate : false})
          }).catch((err) => {
            console.log(err)
            return
          })
      }

    render(){
    return (
        <div>
       <Container>
        
        <button type="button" onClick={this.toggle} className="btn btn-primary" data-toggle="modal" style={{ marginLeft : '30px', marginTop : '10px', marginBottom : '10px' }}>
        <i className="fa fa-plus-square"> Add Data</i>
        </button>

    {this.state.isOpen&&( 
      <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="">
        <ModalHeader toggle={this.toggle}>ADD JOB</ModalHeader>
        <ModalBody>
        <br></br>
        <Form id="register" method="post" onSubmit ={this.handleSubmit}>
    <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" id="name" onChange={this.handlenameChange} placeholder="Enter your name" required/>
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="textarea" name="description" id="description" onChange={this.handleDescriptionChange} placeholder="Enter your job description" required/>
      </FormGroup>
      <FormGroup>
        <Label for="id_category">ID Category</Label>
        <Input type="number" name="id_category" id="id_category" onChange={this.handleCategoryChange} placeholder="Enter your id category" required/>
      </FormGroup>
      <FormGroup>
        <Label for="salary">Salary</Label>
        <Input type="number" name="salary" id="salary" onChange={this.handleSalaryChange} placeholder="Enter your salary" required/>
      </FormGroup>
      <FormGroup>
        <Label for="location">Location</Label>
        <Input type="text" name="location" id="location" onChange={this.handleLocationChange} placeholder="Enter your salary" required/>
      </FormGroup>
      <FormGroup>
        <Label for="id_company">ID Company</Label>
        <Input type="text" name="id_company" id="id_company" onChange={this.handleCompanyChange} placeholder="Enter your id Company" required/>
      </FormGroup>
      <Button className='button_login bg-success'>Submit</Button>
    </Form>
        </ModalBody>
      </Modal>

        )}

      {
        this.props.job.isLoading&&(
        <div><Spinner style={{ width: '3rem', height: '3rem' }} type="grow" /></div>
      )}

    {!this.props.job.isLoading&&
    
    <React.Fragment>
    {this.props.job.data.map((v,i)=>(  

    <div className="row no-gutters shadow-lg p-3 mb-5 bg-white rounded" key={i.toString()} >
    <div className="col-md-4">
      <img  src={v.logo} className="card-img App-img" alt={v.name} width="120px" height="160px"/>
    </div>
    
      <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title" >{v.name}</h5>
        <p className="card-text"><small className="text-muted">{v.company}</small> | <small className="text-muted">Rp.{v.salary}</small> | <small className="text-muted">{v.location}</small></p>
        <p className="card-text">{v.description}</p>
        <p className="card-text"><small className="text-muted">{v.date_updated}</small></p>
        <Button className="card-text bg-success"  onClick={() => this.toggleupdate(v.id)}><i className="fa fa-edit"> Update </i></Button>
        <Button className="card-text bg-danger"style={{ marginLeft : '10px' }} onClick={()=> this.deleteData(v.id)}><i className="fa fa-trash"> Delete </i></Button>
      </div>
    </div>

    {this.state.isOpenUpdate &&(  
  
    <Modal isOpen={this.state.isOpenUpdate} toggle={this.toggleupdate}>
    <React.Fragment> 
    <ModalHeader toggle={this.toggleupdate}>EDIT JOB</ModalHeader>
    <ModalBody>
    <br></br>
    <Form id={v.id} method="post" onSubmit ={this.handleSubmitUpdate}>
    <FormGroup>
        <Label for="name">Job Name</Label>
        <Input type="text" name="name" id="name" onChange={this.handlenameChange}  defaultValue={v.name} placeholder="Enter your name" required/>
      </FormGroup>
      <FormGroup>
        <Label for="description">Job Description</Label>
        <Input type="textarea" name="description" id="description" onChange={this.handleDescriptionChange} defaultValue={v.description} placeholder="Enter your job description" required/>
      </FormGroup>
      <FormGroup>
        <Label for="id_category">ID Category</Label>
        <Input type="number" name="id_category" id="id_category" onChange={this.handleCategoryChange} defaultValue={v.id_category} placeholder="Enter your id category" required/>
      </FormGroup>
      <FormGroup>
        <Label for="salary">Salary</Label>
        <Input type="number" name="salary" id="salary" onChange={this.handleSalaryChange} defaultValue={v.salary} placeholder="Enter your salary" required/>
      </FormGroup>
      <FormGroup>
        <Label for="location">Location</Label>
        <Input type="text" name="location" id="location" onChange={this.handleLocationChange} defaultValue={v.location} placeholder="Enter your salary" required/>
      </FormGroup>
      <FormGroup>
        <Label for="id_company">ID Company</Label>
        <Input type="text" name="id_company" id="id_company" onChange={this.handleCompanyChange} defaultValue={v.id_company} placeholder="Enter your id company" required/>
      </FormGroup>
      <Button className='button_login bg-success'>Submit</Button>
      </Form>
    </ModalBody>
    </React.Fragment> 
  </Modal>

    )}      

   </div> 
  ))}
  </React.Fragment>

}

<nav aria-label="Page navigation example">
    <ul className="pagination justify-content-center">
    {
        this.state.previous === ' ' ? null :
        <li className="page-item">
         <a className="page-link" onClick={()=>this.buttonPress(this.state.previous)} tabindex="-1" aria-disabled="false">Previous</a>
        </li>
      }  
        <li className="page-item">
        {
        this.state.next === ' ' ? null :<a className="page-link" onClick={()=>this.buttonPress(this.state.next)} tabindex="-1">Next</a>
        }</li>
    </ul>
</nav>
</Container>
 </div>
)}
}

const mapStateProps = state => ({
  job : state.job
})

export default connect(mapStateProps)(CrudJob)