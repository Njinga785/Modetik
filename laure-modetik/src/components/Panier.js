import React, { Component } from 'react'
import { connect } from 'react-redux'
import {removeProduit, addQuantite, subtractQuantite} from './store/actions/actionPanier'
//  import { Link } from 'react-router-dom'
// import Card from 'react-bootstrap/Card'
// import CardGroup from 'react-bootstrap/CardGroup'
 import Button from 'react-bootstrap/Button';
// import axios from 'axios'
// import Table from 'react-bootstrap/Table';
// import PanierItem from './PanierItem';


export class Panier extends Component {
    constructor(props) {
        super(props)
        this.state = {
             total: 0, 
            produits: this.props.produits,
            date: '',
            client_id: '', 
            quantite: this.props.quantite, 
            
        }
    } 

    

    // async validatedPart() {
    // const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${this.props.token}`
    // }
    // const articles = {
    //     panier: this.props.panier,
    //     quantite: this.props.quantite

    // }
    // console.log(this.props.panier)
    // axios.post('http://localhost:3003/panier', articles, {
    //     headers: { authorization: `Bearer ${this.props.token}` },


    //     produit_id: this.props.produit
    // //    panier: this.props.panier

    //     })
    //         .then((response) => {
    //             console.log(response)

    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })


    // } 
      //to remove the item completely
      handleRemoveProduit = (id)=>{
        this.props.removeProduit(id);
    }
    //to add the quantity
    handleAddQuantite = (id)=>{
        this.props.addQuantite(id);
    }
    //to substruct from the quantity
    handleSubtractQuantite = (id)=>{
        this.props.subtractQuantite(id);
    } 
    // handleTotalPrice = (prix, quantite) =>{
    //     return(prix * quantite)
    // }
    
    


    render() { 
        console.log(this.props.produits.map(p => p.id))
        console.log(this.props.allProduits.map(p => p.id))   
        // let total = this.state.total;
        let addedProduits = this.props.produits && this.props.produits.length ?
            ( 
                
                this.props.produits.map(produit => {
                    console.log(this.props.produits)
                    // console.log(this.props.allProduits)
                    let infoProduit = this.props.allProduits.find(p => p.id === produit.id) 
                    
                     console.log(infoProduit) 
                    
                    return ( 
                        <li className="collection-item avatar"  key={produit.id}>
                                    <div className="item-img"> 
                                        <img src={infoProduit.photo} width="286" height="286" alt="infoProduit" className=""/>
                                    </div>
                                
                                    <div className="item-desc">
                                        <span className="title">{infoProduit.nom}</span>
                                        {/* <p>{infoProduit.description}</p> */}
                                        <p><b>{infoProduit.prix}</b></p> 
                                        {/* <p>
                                            <b> Total: {infoProduit.prix * produit.quantite}</b>
                                            </p> */}
                                        <Button variant="info" onClick={()=>{this.handleAddQuantite(produit.id)}}>+</Button>
                                        <p>
                                            <b>Quantite: {produit.quantite}</b> 
                                        </p> 
                                        <Button variant="info" onClick={()=>{this.handleSubtractQuantite(produit.id)}}>-</Button>
                                        
                                      <div> <Button variant="danger" onClick={()=>{this.handleRemoveProduit(produit.id)}}>Remove</Button></div> 
                                    </div>
                                    
                               </li>                      
                        
                    )
                })
            ): 
            (
                <p><b>Votre Panier est vide</b></p>
            ) 
            return (
                <div className="container">
                <div className="cart">
                    <h5>Vous avez {addedProduits.length} produits dans votre panier</h5>
                    <ul className="collection">
                        {addedProduits}
                    </ul>
                </div>  
            </div>
            )
        // const { panierItem } = this.props;
        // const produits = this.props.produits
        // const panier = this.props.panier 
        // return (
        //     <div>

        //         <Panier panierItem={this.state.panierItem}
        //             addTopanier={this.addTopanier}></Panier>


        //       return (
        //         <div>
        //             {/* <div>

        //                 {panierItem.length === 0 ? (<div>Panier vide</div>
        //                 ) : (
        //                         <div>{panierItem.length}</div>)}
        //             </div> */}


        //             <Button variant="success" onClick={() => this.validatedPart()}>Order</Button>

        //         </div>
        //     )
        //     </div>
        // )

    }



}

const mapStateToProps = (state) => ({
    // panier: state.panierReducer.paniers,
    // produits: state.produitsReducer.produits,
    token: state.clientReducer.token,
    // quantite: state.panierReducer.quantite 
    produits: state.panierReducer.addedProduits,
    allProduits: state.produitsReducer.produits


})
const mapDispatchToProps = {
    removeProduit,
    addQuantite,
    subtractQuantite
}


export default connect(mapStateToProps, mapDispatchToProps)(Panier)