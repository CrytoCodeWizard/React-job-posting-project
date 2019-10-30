/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from 'axios';
import React, {Component} from 'react';
import {Row, Col, Container, Button} from 'reactstrap'
import Img from './../logo.svg'



export default class JobItem extends Component{
    constructor(props){
        super(props)
        this.state = {
            data : {},
            isLoading : true,
            next: '',
            previous: '',
            tot : ''
        }
    }

    componentDidMount(){
      this.getData().then(data=>{
        this.setState(
          {data,
           next:data.next,
           previous:data.prev,
           tot : data.total_data,
           isLoading:false}
           )
        })
      }

    getData = async(page)=>{
      const character = await axios.get(page!==undefined ? page:'http://localhost:2000/job')
      return character.data  
    }


    goToDetail = (id)=>{
        
    }

    buttonPress = async(page)=>{
      this.setState({isLoading:true})
      this.getData(page).then(data=>{
        this.setState({data,next:data.next,prev:data.prev,tot : data.total_data,isLoading:false})
      })
    }  

render() {
  return (

    <div className="card mb-3">
      
    <div className="bg-dark text-light text-center text-lg"><strong> There is {this.state.tot} Job in data</strong></div> 

    <div class="form-group">
      <select class="form-control" id="orderby">
        <option>Sort By</option>
        <option>Name</option>
        <option>Company</option>
        <option>Date Update</option>
      </select>
    </div>


      {
        this.state.isLoading&&(
        <div>isLoading...</div>
      )}

    {!this.state.isLoading&&
    
    <React.Fragment>
    { 
      this.state.data.data.map((v,i)=>(  
    
    <div className="row no-gutters" key={i.toString()}>

    <div className="col-md-4">
      <img src={v.logo} className="card-img App-img" alt={v.name} width="120px" height="120px"/>
    </div>
    
      <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{v.name}</h5>
        <p className="card-text"><small className="text-muted">{v.company}</small> | <small className="text-muted">Rp.{v.salary}</small> | <small className="text-muted">{v.location}</small></p>
        <p className="card-text">{v.description}</p>
        <p className="card-text"><small className="text-muted">{v.date_updated}</small></p>
      </div>
    </div>

   </div> 
  ))}
  </React.Fragment>
}

<nav aria-label="Page navigation example">
    <ul className="pagination justify-content-center">
        <li className="page-item">
        <a className="page-link" onClick={()=>this.buttonPress(this.state.prev)} tabindex="-1" aria-disabled="false">Previous</a>
        </li>
        <li className="page-item">
        <a className="page-link" onClick={()=>this.buttonPress(this.state.next)} tabindex="-1">Next</a>
        </li>
    </ul>
</nav>
</div>

    );
  }
};