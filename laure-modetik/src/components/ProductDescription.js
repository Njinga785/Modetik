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
           produit: []
            // id:this.props.match.params.id
        }
    } 

    addToPanier(){ 
        
        this.props.addToPanier(this.props.match.params.id)
    }
    componentDidMount() {
        let id = this.props.match.params.id
        console.log(id)
        axios.get(`http://localhost:3003/produits/${id}`)
            .then((response) => {
                console.log(response) 
                // this.props.addToPanier(response.data)
                this.setState({
                    produit: response.data[0]
                })

            })
    }

    render() {
        const produit = this.state.produit ? (
            <Card style={{ width: '20rem', margin: 'auto'}}>
                <Card.Img variant="top" src={this.state.produit.photo} />
                <Card.Body>
                    <Card.Title>{this.state.produit.nom}</Card.Title>
                    <Card.Text>{this.state.produit.prix}</Card.Text> 
                    <Card.Text>{this.state.produit.description}</Card.Text>
                    <p>  {localStorage.getItem("token") && (<Button id='button' onClick={() => this.addToPanier()} variant="success">AJOUTER AU PANIER</Button>)} 1</p>
                    
                </Card.Body>
            </Card>


        ) : (
                <div className="attente">Loading produit...</div>
            )
        // console.log(produit)
        return (
            <div className="container">
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