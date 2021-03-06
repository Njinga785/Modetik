import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeProduit, addQuantite, subtractQuantite } from './store/actions/actionPanier'
import {AiFillDelete}  from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import {clearPanier} from './store/actions/actionPanier'



export class Panier extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total: '',
            produits: this.props.produits,
            addedProduits: this.props.addedProduits,
            client_id: '',
            quantite: this.props.quantite,
            totalProduits: ''
        }
    }

    componentDidMount() {
        let nombre = 0
        this.props.produits.forEach(produit => {
            nombre = nombre + produit.quantite
        })

        this.setState({

            quantite: nombre
        })
        // console.log(this.state.quantite)
    }

    async validatedPart(total) {
        
        const articles = { 
            addedProduits: this.props.addedProduits,
            quantite: this.props.quantite,
            total: total
        }
        console.log(this.props.addedProduits)
        console.log(articles) 
        // console.log(this.props.total)

        axios.post('http://localhost:3003/panier', articles, {
            headers: { authorization: `Bearer ${localStorage.getItem('tokenClient')}` },
        })
            .then((response) => {
                console.log(response)


            })
            .catch((err) => {
                console.log(err)

            })


    }
    //to remove the item completely
    handleRemoveProduit = (id) => {
        this.props.removeProduit(id);
    }
    //to add the quantity
    handleAddQuantite = (id) => {
        this.props.addQuantite(id);
    }
    //to substruct from the quantity
    handleSubtractQuantite = (id) => {
        this.props.subtractQuantite(id);
    } 

    handleClearPanier = () => {
        this.props.clearPanier();
    }
    




    render() {

        let total = 0
        let addedProduits = this.props.produits && this.props.produits.length ?
            (

                this.props.produits.map(produit => {
                    console.log(this.props.produits)
                    // console.log(this.props.allProduits)
                    let infoProduit = this.props.allProduits.find(p => p.id === produit.id)
                    let totalProduits = 0
                    let price = parseInt(infoProduit.prix.split('€')[0])
                    totalProduits = price * produit.quantite
                    console.log(infoProduit)
                    total += totalProduits 
                   


                    return (
                        <div className="papa" key={produit.id}>
                            <li className="collection-item avatar" >
                                <div className="item-img">
                                    <img src={infoProduit.photo} width="286" height="286" alt="infoProduit" className="" />
                                </div>

                                <div className="item-desc">
                                    <span className="title">{infoProduit.nom}</span>

                                    <p><b>{infoProduit.prix}</b></p>

                                    <Button variant="info" onClick={() => { this.handleAddQuantite(produit.id) }}>+</Button>
                                    <p>
                                        <b>Quantite: {produit.quantite}</b>
                                    </p>
                                    <Button variant="info" onClick={() => { this.handleSubtractQuantite(produit.id) }}>-</Button>

                                    <div> <Button variant="danger" onClick={() => { this.handleRemoveProduit(produit.id) }}><AiFillDelete color='white' size='2rem'/></Button></div>

                                    <div>
                                        <strong>TotalProduits: {totalProduits.toFixed(1)}</strong>
                                        
                                    </div>
                                </div>

                            </li>

                        </div>

                    )
                })
            ) :
            (
                <p><b>Votre Panier est vide</b></p>
            )
        return (
            <div className="containerPanier">
                <div className="cart">
                    <h3 className="panierTitre">Mon Panier</h3>
                    <h5>Vous avez {this.state.quantite} produits dans votre panier</h5>
                    <ul className="collection">
                        {addedProduits}
                    </ul>
                  <h4><strong>  Total: {total}</strong></h4>
                    <div className="boutonPanier"><div><Button variant="success" onClick={() => this.validatedPart(total)}>Commander</Button></div>&nbsp;<div> <Button variant="danger" onClick={() => this.handleClearPanier()}>Vider Panier</Button></div></div>
                </div>
            </div>
        )


    }



}

const mapStateToProps = (state) => ({
    panier: state.panierReducer.paniers,
    // produits: state.produitsReducer.produits,
    token: state.clientReducer.token,
    quantite: state.panierReducer.quantite,
    produits: state.panierReducer.addedProduits,
    allProduits: state.produitsReducer.produits,
    addedProduits: state.panierReducer.addedProduits


})
const mapDispatchToProps = {
    removeProduit,
    addQuantite,
    subtractQuantite,
    clearPanier
}


export default connect(mapStateToProps, mapDispatchToProps)(Panier)