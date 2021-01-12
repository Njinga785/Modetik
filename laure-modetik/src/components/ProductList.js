import React, { Component } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import { connect } from 'react-redux'
import { getListProduits } from './store/actions/actionProduits'

export class ProductList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            produits: []
        } 
        
    }
    componentDidMount() {
        axios.get('http://localhost:3003/produits')
            .then((response) => {
               
                   console.log(response.data) 
                    this.props.getListProduits(response.data)
              
            }) 
            .catch(error => {
                console.error(error)
              })
    } 
    render() {
        const produits=this.props.produits
        return (
            <div>
            {produits && produits.map(produit => {

                return ( 
                
                    <CardGroup style={{ width: '18rem' }} className="produit-list" key={produit.id}>
                        <Card  >
                           
                                <Card.Img variant="top" src={produit.photo} width="286" height="180" alt="" />
                                <Card.Body className="body">
                                    <Card.Title>{produit.nom}</Card.Title>
                                    <Card.Text>{produit.prix}</Card.Text> 
                                    
                                </Card.Body>
                            
                            
                        </Card> 
                        
                    </CardGroup> 
                    

                )
            })} 
            </div>
        )
    }
} 

const mapStateToProps = (state) => ({
    produits: state.produitsReducer.produits
})

const mapDispatchToProps = {
    getListProduits
}

export default connect(mapStateToProps, mapDispatchToProps) (ProductList)
