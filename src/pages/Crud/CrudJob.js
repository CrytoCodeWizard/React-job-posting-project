/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react'
import {BrowserRouter,Route,Switch,withRouter,Link} from 'react-router-dom'
import axios from 'axios'
import {
    Spinner,Button, Modal, ModalHeader, ModalBody
  } from 'reactstrap';
import { Container } from 'reactstrap';
import {  Form, FormGroup, Label, Input} from 'reactstrap';
import UpdateJob from './job/UpdateJob' 

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

      goToUpdate = (id)=>{
        this.props.history.push('/postjobs/crudjob/updatejob/'+ id)
        this.setState({isOpen : false , isUpdateOpen : !this.state.isUpdateOpen})
      }
  
      buttonPress = async(page)=>{
        this.setState({isLoading:false}) 
        this.getData()
      }  

      getData = ()=>{
        axios.get('http://localhost:2000/job').then(res => {
          this.setState({data: res.data ,next:res.next,previous:res.prev,tot : res.total_data,isLoading:false})
        }) 
      }
      
      deleteData = (id)=>{
        axios.delete(`http://localhost:2000/job/${id}`).then(data=>{
          this.setState({isLoading:false})
          this.getData()
        }).catch(err => {
          console.log(err)
        })
        
      }

      addJob = async(dataJob) => {
        const user = await axios.post('http://localhost:2000/job',(dataJob))
        return user.data 
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
             alert(res.message)
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
  
    render(){
    return (
        <div>
       <Container>
        
        <button type="button" onClick={this.toggle} className="btn btn-primary" data-toggle="modal" style={{ marginLeft : '30px', marginTop : '10px', marginBottom : '10px' }}>
        <i className="fa fa-plus-square"> Add Data</i>
        </button>
        <BrowserRouter>
        <Switch>
        <Route path='/postjobs/crudjob/updatejob/:id' component={UpdateJob}/>
        </Switch>   
      </BrowserRouter>
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
        <Input type="text" name="id_company" id="id_company" onChange={this.handleCompanyChange} placeholder="Enter your salary" required/>
      </FormGroup>
      <Button className='button_login bg-success'>Submit</Button>
    </Form>
        </ModalBody>
      </Modal>

        )}

      {
        this.state.isLoading&&(
        <div><Spinner style={{ width: '3rem', height: '3rem' }} type="grow" /></div>
      )}

    {!this.state.isLoading&&
    
    <React.Fragment>
    { 
      this.state.data.data.map((v,i)=>(  

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
        <Link to={'/postjobs/crudjob/updatejob/' + v.id}><Button className="card-text bg-success"  onClick={()=> this.goToUpdate(v.id)}><i className="fa fa-edit"> Update </i></Button></Link>
        <Button className="card-text bg-danger"style={{ marginLeft : '10px' }} onClick={()=> this.deleteData(v.id)}><i className="fa fa-trash"> Delete </i></Button>
      </div>
    </div>

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

    
  
    )
    }
}
export default withRouter( CrudJob)