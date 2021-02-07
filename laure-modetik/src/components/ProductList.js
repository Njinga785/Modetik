import React, { Component } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import CardGroup from 'react-bootstrap/CardGroup'

import { connect } from 'react-redux'
import { getListProduits } from './store/actions/actionProduits'
import Filter from './Filter'

export class ProductList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            produits: [],
            categorie: null,
            filteredProduits: []
        }

    }
    componentDidMount() {
        axios.get('http://localhost:3003/produits')
            .then((response) => {

                console.log(response.data)
                this.setState({ produits: response.data })

                this.props.getListProduits(response.data)

            })
            .catch(error => {
                console.error(error)
            })
    }

    filterProduits = async (e) => {
        console.log(e.target.value)
        if (e.target.value) { 
            if (e.target.value === 'Categorie') {
                this.setState({ filteredProduits: [] }) 
                return
            }
            // this.setState({ categorie: e.target.value })
            console.log(this.state.categorie) 
            console.log(e)
            try {
                // let categorie_id = this.state.categorie_id 
                console.log(this.state.categorie_id)
                // let categorie = e.target.value
                let result = await axios.get(`http://localhost:3003/produits/filter/${e.target.value}`)

               let produits_filtered = result.data //.filter(produit => produit.categorie_id === e.target.value) 
               this.setState({  filteredProduits: produits_filtered})

            } catch (err) {
                console.log(err)
            }

        } else {
            this.setState({ filteredProduits: null})
        } 
    }
        render() {

            const produits = this.state.filteredProduits.length? this.state.filteredProduits: this.props.produits

            return (
                <div>
                    <Filter count={produits.length}
                        categorie={this.state.categorie}
                        filterProduits={this.filterProduits}></Filter>
                    <div className="linear">
                        {produits && produits.map(produit => {

                            return (

                                <CardGroup style={{ width: '18rem' }} className="product-list" key={produit.id}>
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
                </div>
            )
        }
    }

    const mapStateToProps = (state) => ({
        produits: state.produitsReducer.produits,
        token: state.adminReducer.token
    })

    const mapDispatchToProps = {
        getListProduits
    }

    export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
