import React , {Component} from 'react'
import axios from 'axios'
import { Spinner ,Jumbotron, Container } from 'reactstrap';

export default class Detail extends Component {
    constructor(props){
        super(props)
        this.state = {
          data : {},
          logo : '',
          name : '',
          company : '',
          salary : '',
          location : '',
          description : '',
          id : props.match.params.id
        }
      }
      
      componentDidMount(){
        axios.get('http://localhost:2000/job/'+ this.state.id).then(res=>{
          this.setState({data: res.data.data[0]})
          console.log(res.data.data[0])
        })
      }


      render() {
        return (
          <div>
            {!this.state.data.id&&(
              <React.Fragment>
               <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
              </React.Fragment>
            )}
            {this.state.data.id&&(
              <div>
               <div>
                <Jumbotron fluid style={{ backgroundImage: `url(${this.state.data.logo})`, backgroundSize: 'cover'  }}>
                <Container fluid>
                <img src={this.state.data.logo} alt="" width="200px" className="image-center shadow-lg p-3 mb-5 bg-white rounded"/>
                
                </Container>
                {console.log(this.state.data.id)}
                
                </Jumbotron>
              </div>
              <Container>
              <h1 className="display-3 text-center">{this.state.data.company}</h1>
              <h5 className="margin-form text-center">Location</h5>
              <p className="lead text-center">{this.state.data.location}</p>
              <h5 className="margin-form text-center">Name</h5>
              <p className="margin-form text-center">{this.state.data.name}</p>  
              <h5 className="margin-form text-center">Salary</h5>
              <p className="margin-form text-center">$.{this.state.data.salary}</p> 
              <h5 className="margin-form text-center">Job Description</h5>
              <p className="margin-form text-center">{this.state.data.description}</p>
              </Container>
              </div>
            )
            
            }
          </div>
        )
      }
    }
    
