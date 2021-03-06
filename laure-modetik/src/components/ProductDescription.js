import React, { Component } from 'react' 
import axios from 'axios'
import Button from 'react-bootstrap/Button'; 
import Card from 'react-bootstrap/Card'
import { connect } from "react-redux"
import {addToPanier} from './store/actions/actionPanier'


export class ProductDescription extends Component {
    constructor() {
        super()
        this.state = {
           produit: [], 
           panierItem: [], 
           quantite: 1
            
        }
    } 
    
    handleAddToPanier = (id) => { 
       
        this.props.addToPanier(id)
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
            <Card className='description' style={{ width: '20rem', margin: 'auto'}}>
                <Card.Img variant="top" src={this.state.produit.photo} />
                <Card.Body>
                    <Card.Title>{this.state.produit.nom}</Card.Title>
                    <Card.Text>{this.state.produit.prix}</Card.Text> 
                    <Card.Text>{this.state.produit.description}</Card.Text>
                    <p>  {localStorage.getItem("tokenClient") && (<Button id='button' onClick={() => this.handleAddToPanier(this.state.produit.id)} variant="success">AJOUTER AU PANIER</Button>)} </p>
                    
                </Card.Body>
            </Card>


        ) : (
                <div className="attente">Loading produit...</div>
            )
        // console.log(produit)
        return (
            <div className="containerProduit">
                {produit}
            </div>

        )
    }
       
}

const mapStateToProps = (state) => ({ // Création des props reducer
   
});

const mapDispatchToProps = { // Création des props action
  addToPanier
}

 
export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription)