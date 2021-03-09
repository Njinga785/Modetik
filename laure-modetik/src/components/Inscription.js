import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      conPasword: '',
      message: '',
      errors: {}

    }
  }


  handleSubmitClient = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      const client = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        conPasword: this.state.conPasword,

      };
      axios.post('http://localhost:3003/clients/sign-up', client)

        .then((response) => {
          
          this.setState({ message: "Vous avez bien été enregistré !" })
          
          console.log(response)

        })
        .catch((err) => {
          this.setState({ message: "Email existe déjà" })
        })
    }
  }


  validateForm = () => {

    let errors = {};
    let formIsValid = true;

    //_______firstName
    if (!this.state.firstName) {
      formIsValid = false;
      errors["firstName"] = "*Please enter your firsName.";
    } else if (this.state.firstName.length < 4) {
      errors["firstName"] ="*Minimum be 4 characters or more"
    }

    if (typeof this.state["firstName"] !== "undefined") {
      if (!this.state["firstName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["firstName"] = "*Please enter alphabet characters only.";
      }
    }

    //_______Last Name
    if (!this.state.lastName) {
      formIsValid = false;
      errors["lastName"] = "*Please enter your lastName.";
    } else if (this.state.lastName.length < 4) {
      errors["lastName"] ="*Minimum be 4 characters or more"
    }

    if (typeof this.state["lastName"] !== "undefined") {
      if (!this.state["lastName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["lastName"] = "*Please enter alphabet characters only.";
      }
    }

    //______Email validation
    if (!this.state["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email.";
    }

    if (typeof this.state["email"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(this.state["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email.";
      }
    }

    //_______Password
    if (!this.state["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (typeof this.state["password"] !== "undefined") {
      if (!this.state["password"].match(/^.*(?=.{4,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password. Must be at least 4 characters, 1 special character (@#$%&), 1 number, 1 lowercase, 1 uppercase letter";
      } 
      //_______conPassword
      if (!this.state["conPassword"]) {
        formIsValid = false;
        errors["conPassword"] = "*Please enter your conPassword.";
      } else if (this.state.conPassword !== this.state.password) {
        errors["conPassword"] = 'Password ne correspond pas' ;
      }

    }

    this.setState({
      errors: errors
    });
    return formIsValid;


  }
  handleChange = (e) => {
    // console.log(e.target.id, e.target.value)
    this.setState({
      [e.target.id]: e.target.value
    })
  }


  render() {
    return (
      <div className="inscrit col-11 col-md-8 mx-auto">
        <Form onSubmit={this.handleSubmitClient}>
          <h1 className="titreForm">Inscription</h1>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control onChange={this.handleChange} type="text" placeholder="First Name" />
            <div className="text-danger">{this.state.errors.firstName}</div>
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control onChange={this.handleChange} type="text" placeholder="Last Name" />
            <div className="text-danger">{this.state.errors.lastName}</div>
          </Form.Group>


          <Form.Group controlId="email">
            <Form.Label>Email adress</Form.Label>
            <Form.Control onChange={this.handleChange} type="email" placeholder="Enter email" />
            <div className="text-danger">{this.state.errors.email}</div>
          </Form.Group>


          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={this.handleChange} type="password" placeholder="password" />
            <div className="text-danger">{this.state.errors.password}</div>
          </Form.Group>


          <Form.Group controlId="conPassword">
            <Form.Label>ConPassword</Form.Label>
            <Form.Control onChange={this.handleChange} type="password" placeholder="conPassword" />
            <div className="text-danger">{this.state.errors.conPassword}</div>
          </Form.Group>

          <Button variant="success" type="submit">Envoyer</Button>
          <p className="editer">{this.state.message}</p>

        </Form>
      </div>
    )
  }
}



export default SignUp
