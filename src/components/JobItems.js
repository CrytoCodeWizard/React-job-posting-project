/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from 'axios';
import React, {Component,useState} from 'react';
import { withRouter } from "react-router";
import {Row, Col, Container, Button,Form, FormGroup, Label, Input,Card } from 'reactstrap'
import { ButtonGroup } from 'reactstrap';
import { Spinner } from 'reactstrap';
import Img from './../logo.svg'


class JobItems extends Component{

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


    goToDetail = (id)=>{
      this.props.history.push('/detail/'+ id)
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
      let page=`http://localhost:2000/job?orderby=${mQuery}`
      this.setState({isLoading:true})
      this.getData(page).then(data=>{
        this.setState({data,
          previous: data.prev,
          next: data.next,
          isLoading:false})
      }).catch(err => {
        console.log(err)
      })
      console.log(mQuery)
    }

render() {
  
  const {data,queryName,queryCompany,orderby,isLoading,next,previous,mQuery} = this.state
  return (
    
    <div>
    <Form inline className="Search-header shadow">
       {/* search {data.name} */}
      <FormGroup>
        <Input type="text" name="name" id="name" placeholder="Search by name" className="search-slt" 
        onChange={this.queryNameChange} value={queryName}  />
        <Input type="text" name="company" id="company" placeholder="Search by company" className="search-slt"
        onChange={this.queryCompanyChange} value={queryCompany} />
        <Button className="btn btn-lg bg-success" onClick={()=>this.doSearch(queryName,queryCompany)} >Search</Button>
      </FormGroup>
    </Form>

    <div className="card mb-3">  

    <div className="bg-dark text-light text-center text-lg"><strong> There is {this.state.tot} Job in data</strong></div> 

    <div class="form-group">
      <select class="form-control" id="orderby" onChange={this.mQueryOrderByChange} onClick={()=> this.doOrderBy(mQuery)}>
        <option value = " ">Sort By</option>
        <option value="name" >Name</option>
        <option value="company">Company</option>
        <option value="date_updated">Newest</option>
      </select>
    </div>


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
        <Button className="card-text bg-success" onClick={()=>this.goToDetail(v.id)}>Apply Job</Button>
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
</div>
</div>
    );
  }
};

export default withRouter(JobItems)