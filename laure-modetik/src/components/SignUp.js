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
            profile: ''

        }
    }


    handleSubmit = (e) => {
        e.preventDefault()
        console.log({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            profile: this.state.profile

        })
        axios.post('http://localhost:3003/client/sign-up', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            profile: this.state.profile

        })
            .then((response) => {
                console.log(response)

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

                    <Form.Group controlId="firstName">
                        <Form.Label htmlFor="firstName">First Name</Form.Label>
                        <Form.Control onChange={this.handleChange} type="text" placeholder="First Name" />
                    </Form.Group>

                    <Form.Group controlId="lastName">
                        <Form.Label htmlFor="lastName">Last Name</Form.Label>
                        <Form.Control onChange={this.handleChange} type="text" placeholder="Last Name" />
                    </Form.Group>


                    <Form.Group controlId="email">
                        <Form.Label htmlFor="email">Email adress</Form.Label>
                        <Form.Control onChange={this.handleChange} type="email" placeholder="Enter email" />
                    </Form.Group> 


                    <Form.Group controlId="password">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control onChange={this.handleChange} type="password" placeholder="password" />
                    </Form.Group>

                    <Form.Group controlId="profile">
                        <Form.Label htmlFor="profile">Profile Picture</Form.Label>
                        <Form.Control onChange={this.handleChange} type="text" placeholder="Picture" />
                    </Form.Group>


                   
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}



export default SignUp
