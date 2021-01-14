import React, { Component } from 'react' 
import axios from 'axios'
import Button from 'react-bootstrap/Button'; 
import Card from 'react-bootstrap/Card'

export class ProductDescription extends Component {
    constructor() {
        super()
        this.state = {
            produit: null
        }
    }
    componentDidMount() {
        let id = this.props.match.params.id
        console.log(id)
        axios.get(`http://localhost:3003/produits/${id}`)
            .then((response) => {
                console.log(response)
                this.setState({
                    produit: response.data[0]
                })

            })
    }

    render() {
        const produit = this.state.produit ? (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.state.produit.photo} />
                <Card.Body>
                    <Card.Title>{this.state.produit.nom}</Card.Title>
                    <Card.Text>{this.state.produit.prix}</Card.Text> 
                    <Card.Text>{this.state.produit.description}</Card.Text>
                    <Button variant="success">AJOUTER AU PANIER</Button>
                </Card.Body>
            </Card>


        ) : (
                <div className="attente">Loading produit...</div>
            )
        console.log(produit)
        return (
            <div className="container">
                {produit}
            </div>

        )
    }
       
}



export default ProductDescription