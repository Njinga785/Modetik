
import React, { Component } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import YourProfile from "./YourProfile";



export class ClientProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      email: '',
      password: ''
      
    }

  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      firstName: this.state.firstName,
      email: this.state.email,
      password: this.state.password
      
    })
    let id = this.props.match.params.id
    axios.put(`http://localhost:3003/clients/${id}`, {
      firstName: this.state.firstName,
      email: this.state.email,
      password: this.state.password,
    

    })
      .then((response) => {
        console.log(response)

      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <h1 className="titreForm">Profile</h1>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control onChange={this.handleChange} type="text" placeholder="First Name" required />
          </Form.Group>

          
         
         <Form.Group controlId="email">
            <Form.Label>Email adress</Form.Label>
            <Form.Control onChange={this.handleChange, this.handleChangeEmail} type="email" placeholder="Enter email" required
              pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" />

          </Form.Group>




          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={this.handleChange} type="password" placeholder="password" required />
          </Form.Group>

          
          <Button variant="primary" type="submit">
            Editer
        </Button>
        </Form>
        <YourProfile />
      </div>
    )
  }
}
export default ClientProfile;