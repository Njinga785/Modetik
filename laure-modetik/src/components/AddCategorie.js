import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export class AddCategorie extends Component {
    constructor() {
        super()
        this.state = {
            categorieNom: ''
        }

    }

    handleSubmit = (e) => {
        e.preventDefault({
            categorieNom: this.state.categorieNom,
            // admin_id: localStorage.getItem('id')
        })

        axios.post(`http://localhost:3003/categorie`, {
            categorieNom: this.state.categorieNom,
            admin_id: localStorage.getItem('id')
        },
            {
                headers: { authorization: `Bearer ${localStorage.getItem('tokenAdmin')}` }


            })
            .then((response) => {
                console.log(response)
                // this.props.addProduct()
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
                <h1 className="titreForm">ADD-CATEGORIE</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group controlId="categorieNom">
                            <Form.Label>Categorie Nom</Form.Label>
                            <Form.Control onChange={this.handleChange} type="text" placeholder="Categorie Nom" required />
                        </Form.Group>
                    </Form.Row>

                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default AddCategorie
