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
            password: '',
            conPassword: '',
            message: '',
            error: {}
        }

    }

    async handleSignUpAdmin(e) {
        e.preventDefault();

        const target = e.target
        if (e.target.name.value && e.target.email.value && e.target.password.value && e.target.conPassword) {
            try {
                this.setState({ name: e.target.name.value, email: e.target.email.value, password: e.target.password.value, conPassword: e.target.conPassword })
                await axios.post("http://localhost:3003/admin/sign-up", { name: e.target.name.value, email: e.target.email.value, password: e.target.password.value, conPassword: e.target.conPassword.value })
                this.setState({ message: "Vous avez bien été enregistré!" })

            } catch (err) {
                this.setState({ message: "Email already registered" })

            }
        } else {
            this.setState({ message: "Sorry, one or more inputs are empty" })
        }


        target.name.value = ""
        target.email.value = ""
        target.password.value = ""
        target.conPassword.value = ""

    }




    render() {
        return (
            <div>
                <div className="form">
                    <h1 className="titreForm">Inscription</h1>
                    <Form onSubmit={this.handleSignUpAdmin}>
                        <Form.Group controlId="name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" required />

                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email address:</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required />

                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Password" required />

                        </Form.Group>
                        <Form.Group controlId="conPassword">
                            <Form.Label>ConPassword:</Form.Label>
                            <Form.Control type="password" placeholder="ConPassword" required />
                        </Form.Group>

                        <Button variant="success" type="submit">Envoyer</Button>

                    </Form>
                </div>
            </div>
        )
    }
}

export default SignUpAdmin
