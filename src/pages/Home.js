/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {Row, Col, Container, Button} from 'reactstrap'
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom'
import { Component } from 'react'
import axios from 'axios'

import Search from './../components/Search'
import Content from './../components/Content'
import JobItems from './../components/JobItems'
import Footer from './../components/Footer'

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
        data : [],
        isLoading : true,
        next: '',
        previous: ''
    }
}

componentDidMount(){
  this.getData();
}

getData = async()=>{
    const job = await axios.get('http://localhost:2000/job').then(res => {
      this.setState({ 
        data: res.data.data,
        next: res.data.next,
        previous: res.data.prev,
        isLoading: false, isError: false})
    }).catch(err => {
      this.setState({ isLoading: false, isError: true })
    })
    console.log(job)
    return job
}

goToDetail = (id)=>{
    
}

  render() {
    const { data, previous, next, isLoading, isError } = this.state;
    return (
      <div className="bg-dark">   
      <BrowserRouter>
     
     {/* Header */}
      <Content/>
      
      
  
      <Container>
      <Search/>  
      {/* Content */}

        {/* <Row className='justify-content-md-center'>
        {this.state.isLoading&&(
          <Col>Loading...</Col>
        )}
        {!this.state.isLoading&&
          <React.Fragment>
            {this.state.data.data.map((v,i)=>(
              <Col sm={{size:'auto'}} key={i.toString()}>
                <div className='text-center'>{v.name}</div>
              </Col>
            ))}
          </React.Fragment>
        }
        </Row> */}

      {/* footer  */}
      <JobItems/>

      </Container>
      
      <Footer/> 

      </BrowserRouter>
      </div>
    )
  }
}

