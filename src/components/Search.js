import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input,Card } from 'reactstrap';
import qs from 'qs'
import axios from 'axios';

export default class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
        query : '',
        queryName : '',
        queryCompany : '',
        isLoading : false
    }
  }

  queryChange = (e)=>{
    const query = e.target.value
    this.setState({query})
  }

  getData = async(e,query)=>{
    if(e.onKeyDown === 13){
      const search = await axios.get(`http://localhost:2000/job?name=${query}`)
      console.log(search.data)
      return search.data  
    }
  }

  render(){

    return (
    <Form inline className="Search-header shadow">
      <FormGroup>
        <Input type="text" name="name" id="name" placeholder="Search by name" className="search-slt"
         onKeyDown={(e)=>this.getData(e,this.state.query)} onChange={this.queryChange} value={this.state.query} />
        <Input type="text" name="company" id="company" placeholder="Search by company" className="search-slt" />
        <Input type="text" name="category" id="category" placeholder="Search by category" className="search-slt" />
        <Button className="btn btn-lg bg-success"  onClick={()=>this.getData(this.state.query)}>Search</Button>
      </FormGroup>
    </Form>
    );
  }
}