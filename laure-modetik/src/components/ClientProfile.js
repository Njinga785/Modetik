
import React, { Component } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { connect } from 'react-redux'
import { updateProfile } from './store/actions/actionClient'





export class ClientProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      // password: this.props.password,
      message: ''

    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleSubmit = (e) => {
    e.preventDefault() 
    // const target = e.target
    console.log({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
       password: this.state.password,


    }) 
    
    // let id = this.props.match.params.id
   
    axios.put(`http://localhost:3003/clients/${this.props.id}`, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password



    })
      .then((response) => {
        console.log(response)
        this.props.updateProfile({ token: response.data.token, firstname: response.data.firstName, lastName: response.data.lastName, email: response.data.email, password: response.data.password })
        this.setState({ message: "votre profil a bien été mis à jour" })
      })
      .catch((err) => {
        console.log(err)
      })
  }


  handleChange = (e) => {
    console.log(e.target.id, e.target.value)
    this.setState({
      firstName: e.target.value
    })
  } 
//   handleChangeLastName(e) {
//     this.setState({lastName: e.target.value})
// }

handleChangeEmail(e) {
    this.setState ({email: e.target.value})
}

  render() {
    return (
      <div className="profile col-11 col-md-8 mx-auto">
        <Form onSubmit={this.handleSubmit}>
          <h1 className="titreForm">Profile</h1>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control onChange={this.handleChange} value={this.state.firstName} type="text" placeholder="First Name" required />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control onChange={this.handleChangeLastName} value={this.state.lastName} type="text" placeholder="Last Name" required />
          </Form.Group>


          <Form.Group controlId="email">
            <Form.Label>Email adress</Form.Label>
            <Form.Control onChange={this.handleChangeEmail} value={this.state.email} type="email" placeholder="Enter email" required
              pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" />

          </Form.Group>




          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control  type="password" placeholder="password" required />
          </Form.Group>



          {/* <div className="invalid-feedback d-block">
            {this.state.message}
          </div> */}

          <Button variant="success" type="submit">Submit</Button>
          <p className="update">{this.state.message}</p>

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
  id: state.clientReducer.id
})
export default connect(mapStateToProps, mapDispatchToProps)(ClientProfile)