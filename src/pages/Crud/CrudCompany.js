/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react'
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom'
import axios from 'axios'
import {
    Spinner,Button
  } from 'reactstrap';

import AddCompany from './company/AddCompany' 
import UpdateCompany from './company/UpdateCompany' 

export default class CrudCompany extends Component {
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
        const company = await axios.get(page !== undefined ? page:'http://localhost:2000/company')
        this.props.history.push('/postjobs/crudcompany');
        return company.data  
      }
      
      deleteData = async(page)=>{
        const company = await axios.delete(page !== undefined ? page:'http://localhost:2000/company')
        this.props.history.push('/postjobs/crudcompany');
        window.location.reload()
        return company.data  
      }
  
      goToUpdate = (id)=>{
        this.props.history.push('/postjobs/crudcompany/updatecompany/'+ id)
        window.location.reload()
      }
  
      buttonPress = async(page)=>{
        this.setState({isLoading:false}) 
        this.getData(page).then(data=>{
          this.setState({data,next:data.next,previous:data.prev,tot : data.total_data,isLoading:false})
        })
      }  

      deleteCompany = async(id) => {
        let url=`http://localhost:2000/company/${id}`
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
        <Link to='/postjobs/crudcompany/addcompany'>
        <button type="button" className="btn btn-primary" data-toggle="modal" style={{ marginLeft : '30px' }}>
        Add Data
        </button>
        </Link>
        <Switch>
        <Route path={'/postjobs/crudcompany/addcompany'} component={AddCompany}></Route>
        <Route path={'/postjobs/crudcompany/updatecompany/:id'} component={UpdateCompany}></Route>
        </Switch>   
        
        {this.state.isLoading&&(
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
        <p className="card-text"><small className="text-muted">{v.location}</small></p>
        <p className="card-text">{v.description}</p>
        <Link to={'/postjobs/crudcompany/updatecompany/' + v.id}><Button className="card-text bg-success"  onClick={()=> this.goToUpdate(v.id)}>Update</Button></Link>
        <Button className="card-text bg-danger"style={{ marginLeft : '10px' }} onClick={()=> this.deleteCompany(v.id)}>Delete</Button>
      </div>
    </div>

   </div> 
  ))}
  </React.Fragment>

}
</BrowserRouter>

 </div>

    
  
    )
    }
}