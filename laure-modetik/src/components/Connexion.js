import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import jwt from "jsonwebtoken";
import { connect } from 'react-redux'
import { SignInClients } from './store/actions/actionClient'



export class Connexion extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
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
                    console.log('je suis bien dans le if')
                    localStorage.setItem('tokenClient', response.data.token)
                    localStorage.setItem('firstName', decoded.firstName)
                    localStorage.setItem('lastName', decoded.lastName)
                    localStorage.setItem('email', decoded.email)
                    localStorage.setItem('id', decoded.id)
                    this.props.SignInClients(response.data.token, decoded.firstName, decoded.lastName, decoded.email, decoded.id)
                    //  this.props.userProducts()
                    this.props.history.push('/mespaniers')
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
                <div className="form col-11 col-md-8 mx-auto">
                    <h1 className="titreForm">Connection</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Email address:</Form.Label>
                            <Form.Control onChange={this.handleChange} type="email" placeholder="Enter email" required />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control onChange={this.handleChange} type="password" placeholder="Password" required />
                        </Form.Group>

                        <Button variant="success" type="submit">Envoyer</Button>
                        
                    </Form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    SignInClients
}

export default connect(null, mapDispatchToProps)(Connexion)
