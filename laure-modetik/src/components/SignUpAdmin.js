import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export class SignUpAdmin extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
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
        if (e.target.name.value && e.target.email.value && e.target.password.value && e.target.profile.value) {
            try {
                this.setState({ name: e.target.name.value, email: e.target.email.value, password: e.target.password.value })
                await axios.post("http://localhost:3003/admin/sign-up", { name: e.target.name.value, email: e.target.email.value, password: e.target.password.value, profile: e.target.profile.value })
                this.setState({ message: "" })

            } catch (err) {
                 this.setState({ message: "Email already registered" })
               
            }
        } else {
            this.setState({ message: "Sorry, one or more inputs are empty" })
        }


        target.name.value = ""
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
                <Form.Group controlId="name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email address:</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="profile">
                    <Form.Label>Profile:</Form.Label>
                    <Form.Control type="text" placeholder="Enter profile" />
                </Form.Group>



                <Button variant="primary" type="submit">
                    Sign-UpAdmin
                </Button>
                <p className="error">{this.state.message}</p>
            </Form>
        </div>
            </div>
        )
    }
}

export default SignUpAdmin
