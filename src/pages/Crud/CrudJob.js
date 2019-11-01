/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react'
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom'
import axios from 'axios'
import {
    Spinner,Button
  } from 'reactstrap';

import AddJob from './job/AddJob' 
import UpdateJob from './job/UpdateJob' 

export default class CrudJob extends Component {
    constructor(props){
        super(props)
        this.state = {
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
    componentDidMount(){
        this.getData().then(data=>{
          this.setState(
            {
             data,
             next:data.next,
             previous:data.prev,
             tot : data.total_data,
             isLoading:false
            }
             )
          })
        }
  
      getData = async(page)=>{
        const job = await axios.get(page !== undefined ? page:'http://localhost:2000/job')
        return job.data  
      }
      
      deleteData = async(page)=>{
        const job = await axios.delete(page !== undefined ? page:'http://localhost:2000/job')
        return job.data  
      }
  
      goToUpdate = (id)=>{
        this.props.history.push('/postjobs/crudjob/updatejob/'+ id)
        window.location.reload()
      }
  
      buttonPress = async(page)=>{
        this.setState({isLoading:false}) 
        this.getData(page).then(data=>{
          this.setState({data,next:data.next,previous:data.prev,tot : data.total_data,isLoading:false})
        })
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
        this.getData(url).then(data=>{
          this.setState({data,
            previous: data.prev,
            next: data.next,
            isLoading:false})
        }).catch(err => {
          console.log(err)
        })
        console.log(mQuery)
      }

      deleteJob = async(id) => {
        let url=`http://localhost:2000/job/${id}`
        this.setState({isLoading : true})
        this.deleteData(url).then(data=>{
            this.setState({data,
              previous: data.prev,
              next: data.next,
              isLoading:false})
          }).catch(err => {
            console.log(err)
          })
      }
  
    render(){
    return (
        <div>
        <BrowserRouter>
        <Link to='/postjobs/crudjob/addjob'>
        <button type="button" className="btn btn-primary" data-toggle="modal" style={{ marginLeft : '30px' }}>
        Add Data
        </button>
        </Link>
        <Switch>
        <Route path={'/postjobs/crudjob/addjob'} component={AddJob}></Route>
        <Route path={'/postjobs/crudjob/updatejob/:id'} component={UpdateJob}></Route>
        </Switch>   
        
                  {
        this.state.isLoading&&(
        <div><Spinner style={{ width: '3rem', height: '3rem' }} type="grow" /></div>
      )}

    {!this.state.isLoading&&
    
    <React.Fragment>
    { 
      this.state.data.data.map((v,i)=>(  

    <div className="row no-gutters" key={i.toString()} >
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
        <Button className="card-text bg-danger"style={{ marginLeft : '10px' }} onClick={()=> this.deleteJob(v.id)}>Delete</Button>
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

 </div>

    
  
    )
    }
}