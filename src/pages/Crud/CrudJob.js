/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react'
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom'
import axios from 'axios'
import {
    Spinner,Button
  } from 'reactstrap';
import { Container, Row,Collapse, CardBody, Card } from 'reactstrap';
import {  Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import AddJob from './job/AddJob' 
import UpdateJob from './job/UpdateJob' 

export default class CrudJob extends Component {
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
        this.getData()
        }

      goToUpdate = (id)=>{
        this.props.history.push('/postjobs/crudjob/updatejob/'+ id)
      }
  
      buttonPress = async(page)=>{
        this.setState({isLoading:false}) 
        this.getData()
      }  
  
      queryNameChange = (e)=>{
        const queryName = e.target.value
        this.setState({queryName})
      }
      queryCompanyChange = (e)=>{
        const queryCompany = e.target.value
        this.setState({queryCompany})
      }
    
      doSearch = async(nWord,cWord)=>{
       let page='http://localhost:2000/job?name='+nWord+'&company='+cWord;
        this.setState({isLoading:true})
        this.getData(page).then(data=>{
          this.setState({data,
            previous: data.prev,
            next: data.next,
            isLoading:false})
        })
      }
  
      mQueryOrderByChange = (e)=>{
        const mQuery = e.target.value
        this.setState({mQuery})
      }
  
      doOrderBy = async(mQuery) => {
        let url=`http://localhost:2000/job?orderby=${mQuery}`
        this.setState({isLoading:true})
        this.getData(url).then(res=>{
          this.setState({
            previous: res.prev,
            next: res.next,
            isLoading:false})
        }).catch(err => {
          console.log(err)
        })
        console.log(mQuery)
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
        <BrowserRouter>
        {/* <Link to='/postjobs/crudjob/addjob'>
        
        </Link> */}
        <Switch>
        {/* <Route path={'/postjobs/crudjob/addjob'} component={AddJob}></Route> */}
        <Route path={'/postjobs/crudjob/updatejob/:id'} component={UpdateJob} exact/>
        </Switch>   
        
        <button type="button" onClick={this.toggle} className="btn btn-primary" data-toggle="modal" style={{ marginLeft : '30px', marginTop : '10px', marginBottom : '10px' }}>
        Add Data
        </button>

        {this.state.isOpen&&( <div className='Login-design text-dark shadow p-3 mb-5'>
    <Container>  
    <Label for="register" className='button_login text-center'>ADD JOB</Label>
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
    </Container>
    </div> )}

                  {
        this.state.isLoading&&(
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
        <p className="card-text"><small className="text-muted">{v.company}</small> | <small className="text-muted">Rp.{v.salary}</small> | <small className="text-muted">{v.location}</small></p>
        <p className="card-text">{v.description}</p>
        <p className="card-text"><small className="text-muted">{v.date_updated}</small></p>
        <Link to={'/postjobs/crudjob/updatejob/' + v.id}><Button className="card-text bg-success"  onClick={()=> this.goToUpdate(v.id)}>Update</Button></Link>
        <Button className="card-text bg-danger"style={{ marginLeft : '10px' }} onClick={()=> this.deleteData(v.id)}>Delete</Button>
      </div>
    </div>

   </div> 
  ))}
  </React.Fragment>

}
</BrowserRouter>
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