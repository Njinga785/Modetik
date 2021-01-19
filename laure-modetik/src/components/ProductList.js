import React, { Component } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
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
            <div className="linear">
            {produits && produits.map(produit => {

                return ( 
                
                    <CardGroup style={{ width: '18rem'}} className="product-list" key={produit.id}>
                        <Card>
                        <Link to={'/' + produit.id}>
                                <Card.Img variant="top" src={produit.photo} width="286" height="286" alt="" />
                                <Card.Body>
                                    <Card.Title>{produit.nom}</Card.Title>
                                    <Card.Text>{produit.prix}</Card.Text> 
                                    
                                </Card.Body>
                                </Link>
                            
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
