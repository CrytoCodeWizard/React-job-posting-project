import React , {Component} from 'react'
import axios from 'axios'
import { Spinner ,Jumbotron, Container } from 'reactstrap';

export default class Detail extends Component {
    constructor(props){
        super(props)
        this.state = {
          // id : this.props.match.params.id,
          data: {}
        }
      }
      
      componentDidMount(){
        axios.get('http://localhost:2000/job/'+ this.props.match.params.id).then(res=>{
          this.setState({data: res.data.data[0]})
          console.log(res.data.data)
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
                <h1 className="display-3">{this.state.data.name}</h1>
                <p className="lead left-img">Company : {this.state.data.company}</p>
                <p className="lead left-img">Salary : {this.state.data.salary}</p>
                <p className="lead left-img">Location : {this.state.data.location}</p>
                </Container>
                {console.log(this.state.data.id)}
                
                </Jumbotron>
              </div>
              <h5 className="margin-form">Job Description</h5>
              <p className="margin-form">{this.state.data.description}</p>
              <p className=""></p>
              </div>
            )
            
            }
          </div>
        )
      }
    }
    
