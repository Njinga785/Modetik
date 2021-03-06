import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import jwt from "jsonwebtoken";
import {connect} from 'react-redux' 
import {SignIn} from './store/actions/actionAdmin'

export class ConnexionAdmin extends Component {
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
         axios.post('http://localhost:3003/admin/sign-in', {
            email: this.state.email,
            password: this.state.password,
        })
            .then((response) => {

                let decoded = jwt.decode(response.data.token)

                console.log(decoded)
                if (decoded) {
                    localStorage.setItem('tokenAdmin', response.data.token)
                    localStorage.setItem('name', decoded.name)
                    localStorage.setItem('email', decoded.email)
                    localStorage.setItem('id', decoded.id)
                    localStorage.setItem('isAdmin', true)
                    this.props.SignIn(response.data.token, decoded.name, decoded.email, decoded.id)
                    this.props.history.push('/admin/produistadmin')
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
                            <Form.Control onChange={this.handleChange} type="password" placeholder="Password" required/>
                        </Form.Group>

                        <Button variant="success" type="submit">Envoyer</Button>

                    </Form>
                </div>
            </div>
        )
    }
} 



const mapDispatchToProps = {
    SignIn 
 }

export default connect(null, mapDispatchToProps) (ConnexionAdmin)
