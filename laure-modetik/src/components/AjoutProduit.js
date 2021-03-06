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
                headers : { authorization: `Bearer ${localStorage.getItem('tokenAdmin')}`}
               
            })
            .then((response) => {
                console.log(response)
                
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
                    <h1 className="titreForm">AJOUT-PRODUIT</h1>
                    <Form onSubmit={this.handleSubmit}>

                        <Form.Group controlId="nom">
                            <Form.Label>Produit Nom</Form.Label>
                            <Form.Control onChange={this.handleChange} type="text" placeholder="Produit nom" required/>
                        </Form.Group>

                        <Form.Group controlId="prix">
                            <Form.Label>Prix</Form.Label>
                            <Form.Control onChange={this.handleChange} type="text" placeholder="Prix" required />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control onChange={this.handleChange} as="textarea" placeholder="Description" required />
                        </Form.Group>

                        <Form.Group controlId="photo">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control onChange={this.handleChange} type="text" placeholder="Photo" required />
                        </Form.Group>


                        <Form.Group controlId="categorie_id">
                            <Form.Label>Categorie</Form.Label>
                            <Form.Control onChange={this.handleChange} type="text" placeholder="Categorie" required/>
                        </Form.Group>




                        <Button variant="success" type="submit">Ajouter</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default AddProduct
