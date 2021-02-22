
import React, { Component } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
// import YourProfile from "./YourProfile";
// import jwt from "jsonwebtoken";
import { connect } from 'react-redux'
import { updateProfile } from './store/actions/actionClient'
// import clientReducer from './store/reducers/clientReducer';




export class ClientProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      password: this.props.password, 
      profile: this.props.profile

    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password, 
      

    })
    let id = this.props.match.params.id
    console.log(this)
    axios.put(`http://localhost:3003/clients/${id}`, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password, 
      


    })
      .then((response) => {

        this.props.updateProfile({ token: response.data.token, firstname: response.data.firstName, lastName: response.data.lastName, email: response.data.email, password: response.data.password })

      })
      .catch((err) => {
        console.log(err)
      })
  }


  handleChange = (e) => {
    console.log(e.target.id, e.target.value)
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <h1 className="titreForm">Profile</h1>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control onChange={this.handleChange} value={this.state.firstName} type="text" placeholder="First Name" required />
          </Form.Group>

           <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control onChange={this.handleChange} value={this.state.lastName} type="text" placeholder="Last Name" required />
                    </Form.Group> 


          <Form.Group controlId="email">
            <Form.Label>Email adress</Form.Label>
            <Form.Control onChange={this.handleChange} value={this.state.email} type="email" placeholder="Enter email" required
              pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" />

          </Form.Group>




           <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.handleChange} value={this.state.password} type="password" placeholder="password" required/>
                    </Form.Group> 

           

          <div className="invalid-feedback d-block">
            {this.state.message}
          </div>

          <Button variant="success" type="submit">
            Submit
                    </Button>

        </Form>
       
      </div>
    )
  }
}

const mapDispatchToProps = {
  updateProfile
}

const mapStateToProps = (state) => ({
  firstName: state.clientReducer.firstName,
  lastName: state.clientReducer.lastName,
  email: state.clientReducer.email,
  password: state.clientReducer.password, 
  // profile: state.clientReducer.profile
})
export default connect(mapStateToProps, mapDispatchToProps)(ClientProfile)