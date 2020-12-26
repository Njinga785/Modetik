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
            profile: '',
            password: '',
            message: ''
        }
        // this.message = this.message.bind(this);
        this.SignUp = this.SignUp.bind(this)
    }


      





    async SignUp(e) {
        e.preventDefault();
        const target = e.target
        if (e.target.firstName.value && e.target.lastName.value && e.target.email.value && e.target.password.value && e.target.profile.value) {
            try {
                this.setState({ firstName: e.target.firstName.value, lastName: e.target.lastName.value, email: e.target.email.value, password: e.target.password.value })
                await axios.post("http://localhost:3003/clients/sign-up", { firstName: e.target.firstName.value, lastName: e.target.lastName.value, email: e.target.email.value, password: e.target.password.value, profile: e.target.profile.value })
                this.setState({ message: "" })

            } catch (err) {
                 this.setState({ message: "Email already registered" })
               
            }
        } else {
            this.setState({ message: "Sorry, one or more inputs are empty" })
        }


        target.firstName.value = ""
        target.lastName.value = ""
        target.email.value = ""
        target.password.value = ""
        target.profile.value = ""
    }



    render() {
        return (
            <div>
                <div className="form">
                    <h1 className="titreForm">Sign-Up</h1>
                    <Form onSubmit={this.SignUp}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>firstName:</Form.Label>
                            <Form.Control name="firstName" type="text" placeholder="Enter firstName" />
                        </Form.Group>

                        <Form.Group controlId="formBasicName">
                            <Form.Label>lastName:</Form.Label>
                            <Form.Control name="lastName" type="text" placeholder="Enter lastName" />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address:</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicProfile">
                            <Form.Label>Profile:</Form.Label>
                            <Form.Control name="profile" type="text" placeholder="Enter profile" />
                        </Form.Group>



                        <Button variant="primary" type="submit">
                            Sign-Up
                        </Button>
                        <p className="error">{this.state.message}</p>
                    </Form>
                </div>
            </div>
        )
    }
}



export default SignUp
