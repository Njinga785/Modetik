import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export class AddProduct extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            nom: '',
            prix: '',
            description: '',
            photo: '',
            categorie_id: ''
        } 
    }

    handleSubmit = (e) => { 
        e.preventDefault({
            nom: this.state.nom,
            prix: this.state.prix,
            description: this.state.description,
            photo: this.state.photo,
            categorie_id: this.state.categorie_id,
            admin_id: localStorage.getItem('id')
        })
       
        axios.post(`http://localhost:3003/produits`, {
            nom: this.state.nom,
            prix: this.state.prix,
            description: this.state.description,
            photo: this.state.photo,
            categorie_id: this.state.categorie_id,
            admin_id: localStorage.getItem('id')
        },
            {
                headers: {
                    token: localStorage.getItem('token')
                   
                }
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
            <Form onSubmit={this.handleSubmit}>
            <Form.Row>
                <Form.Group controlId="nom">
                    <Form.Label>Produit Nom</Form.Label>
                    <Form.Control onChange={this.handleChange} type="text" placeholder="Produit nom" />
                </Form.Group>

                <Form.Group controlId="prix">
                    <Form.Label>Prix</Form.Label>
                    <Form.Control onChange={this.handleChange} type="text" placeholder="Prix" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={this.handleChange} as="textarea" placeholder="Description" />
                </Form.Group>

                <Form.Group controlId="photo">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control onChange={this.handleChange} type="text" placeholder="Photo" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group controlId="categorie_id">
                    <Form.Label>Categotie</Form.Label>
                    <Form.Control onChange={this.handleChange} type="text" placeholder="Categorie" />
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

export default AddProduct
