import React, { Component } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import { connect } from 'react-redux'
import { getListProducts } from './store/actions/actionProducts'

export class ProductList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        } 
        
    }
    componentDidMount() {
        axios.get('http://localhost:3003/produits')
            .then((response) => {
               
                   console.log(response.data) 
                    this.props.getListProducts(response.data)
              
            }) 
            .catch(error => {
                console.error(error)
              })
    } 
    render() {
        const products=this.props.products
        return (
            <div>
            {products && products.map(product => {

                return ( 
                
                    <CardGroup style={{ width: '18rem' }} className="product-list" key={product.id}>
                        <Card  >
                           
                                <Card.Img variant="top" src={product.photo} width="286" height="180" alt="" />
                                <Card.Body className="body">
                                    <Card.Title>{product.nom}</Card.Title>
                                    <Card.Text>{product.prix}</Card.Text> 
                                    
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
    products: state.productsReducer.products
})

const mapDispatchToProps = {
    getListProducts
}

export default connect(mapStateToProps, mapDispatchToProps) (ProductList)
