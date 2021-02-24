import React, { Component } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import Modal from 'react-modal';
import Table from "react-bootstrap/Table";

export class ClientsAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clients: [],
            modalIsOpen: false,
            firstName: '',
            lastName: '',
            email: '',
            message: '',
            
            id: ''
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(client) {
        this.setState({
            modalIsOpen: true,
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            
            id: client.id
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }


    handleSubmit = (e) => {
        e.preventDefault()
        console.log({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
           


        })

        let personne = { 
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            profile: this.state.profile, 
            


        }
        
        axios.put(`http://localhost:3003/clients/${this.state.id}`, personne,  {headers: {'Content-Type': 'application/json'}}) 



        
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response;



            }).then((data) => {
                console.log(data)
                if (data === "success") {
                    this.setState({
                        message: "client has been edited."
                    });
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    componentDidMount() {

        axios.get('http://localhost:3003/clients')
            .then((response) => {

                console.log(response.data)
                this.setState({ clients: response.data })


            })
            .catch(error => {
                console.error(error)
            })
    }

    deleteClient(id) {
      
        axios.delete(`http://localhost:3003/clients/${id}`, {
            
         })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response;



            }).then((data) => {
                console.log(data)
                if (data === "success") {
                    this.setState({
                        message: "client has been delete"
                    });
                }
            }).catch((err) => {
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
        const clients = this.state.clients
        return (
            <div className='clients'>
                <h4 className="title">LES CLIENTS</h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Email</th>
                           
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients && clients.map(client => {
                            return (


                                <tr key={client.id}>
                                    <td>{client.firstName}</td>
                                    <td>{client.lastName}</td>
                                    <td>{client.email}</td>
                                   
                                    <td>
                            

                                        <span className="btn btn-danger" onClick={() => this.deleteClient(client.id)}>Delete</span>
                                    </td>
                                </tr>
                            )



                        })}

                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                            ariaHideApp={false}
                            contentLabel="Example Modal" >
                            <div className="form">
                                <h1 className="titreForm">CLIENT EDIT</h1>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="firstName">
                                        <Form.Label>FirstName</Form.Label>
                                        <Form.Control onChange={this.handleChange} value={this.state.firstName} type="text" placeholder="firstName" required />
                                    </Form.Group>

                                    <Form.Group controlId="lastName">
                                        <Form.Label>LastName</Form.Label>
                                        <Form.Control onChange={this.handleChange} value={this.state.lastName} type="text" placeholder="lastName" required />
                                    </Form.Group>

                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control onChange={this.handleChange} value={this.state.email} type="email" placeholder="Email" required />
                                    </Form.Group>

                                    
                                    <Button variant="success" type="submit">Submit</Button>  <Button variant="outline-dark" type="close" onClick={() => this.closeModal()}>Close</Button>

                                </Form>
                            </div>
                        </Modal>
                    </tbody>
                </Table>

            </div>
        )
    }
}

export default ClientsAdmin
