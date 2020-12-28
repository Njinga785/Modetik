import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import jwt from "jsonwebtoken";

export class SignInClients extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()


        axios.post('http://localhost:3003/clients/sign-in', {
            email: this.state.email,
            password: this.state.password,
        })
            .then((response) => {
                
                let decoded = jwt.decode(response.data.token)

                console.log(decoded)
                if (decoded) {
                    localStorage.setItem('token', response.data.token)
                      localStorage.setItem('firstName', decoded.firstName)
                      localStorage.setItem('id', decoded.id)
                     localStorage.setItem('email', decoded.email)
                    // this.props.signIn(response.data.token, decoded.name, decoded.email, decoded.id)
                    //  this.props.userProducts()
                    //   this.props.history.push('/')
                } else {

                    console.log('acces interdit')
                }

            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }
    render() {
        return (
            <div>
                <div className="form">
                    <h1 className="titreForm">Sign-In</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Email address:</Form.Label>
                            <Form.Control onChange={this.handleChange} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control onChange={this.handleChange} type="password" placeholder="Password" />
                        </Form.Group>

                        <Button variant="success" type="submit">
                            Sign-In
                        </Button>

                    </Form>
                </div>
            </div>
        )
    }
}

export default SignInClients
