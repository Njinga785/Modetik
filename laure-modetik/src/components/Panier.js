import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
// import Card from 'react-bootstrap/Card'
// import CardGroup from 'react-bootstrap/CardGroup'
// import Button from 'react-bootstrap/Button';
import axios from 'axios'
// import Table from 'react-bootstrap/Table';
// import PanierItem from './PanierItem';


export class Panier extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total: '', 
            produits: this.props.produits,
            date: '',
            client_id: ''
        }
    }

    async validatedPart() {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.token}`
    }
    const articles = {
        panier: this.props.panier,
        quantite: this.props.quantite

    }
    console.log(this.props.panier)
    axios.post('http://localhost:3003/panier', articles, {
        headers: { authorization: `Bearer ${this.props.token}` },


        produit_id: this.props.produit
    //    panier: this.props.panier

        })
            .then((response) => {
                console.log(response)

            })
            .catch((err) => {
                console.log(err)
            })


    }
    // componentDidMount() {
    // const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${this.props.token}`
    //     }
    //     axios.get('http://localhost:3003/panier', { headers: { authorization: `Bearer ${this.props.token}` } })
    //         .then((response) => {
    //             console.log(response)

    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })

    // }


    render() {
        let addedProduits = this.props.produits && this.props.produits.length ?
            (
                this.props.produits.map(produit => { 
                    let infoProduit = this.props.allProduits.find(p => p.id === produit.id) 
                    console.log(infoProduit)
                    return ( 
                        <li key={produit}>
                                    <div> 
                                        <img src={infoProduit.photo} alt={infoProduit.photo} className=""/>
                                    </div>
                                
                                    <div>
                                        <span className="title">{infoProduit.nom}</span>
                                        <p>{infoProduit.description}</p>
                                        <p><b>{infoProduit.prix}</b></p> 
                                        <p>
                                            <b>Quantite: {produit.quantite}</b> 
                                        </p>
                                        {/* <div className="add-remove">
                                            <Link to="/panier"><i className="material-icons">arrow_drop_up</i></Link>
                                            <Link to="/panier"><i className="material-icons">arrow_drop_down</i></Link>
                                        </div>
                                        <button className="waves-effect waves-light btn pink remove">Remove</button> */}
                                    </div>
                                    
                               </li>                      
                        // <CardGroup style={{ width: '18rem' }} className="product-list" key={produit}>
                        //     <Card>

                        //         <Card.Img variant="top" src={produit.photo} width="286" height="286" alt="" />
                        //         <Card.Body>
                        //             <Card.Title>{produit.nom}</Card.Title>
                        //             <Card.Text>{produit.prix}</Card.Text>
                        //             <Card.Text>Quantite:{produit.quantite}</Card.Text>


                        //         </Card.Body>


                        //     </Card>

                        // </CardGroup>
                    )
                })
            ): 
            (
                <p>Nothing.</p>
            ) 
            return (
                <div className="container">
                <div className="panier">
                    <h5>You have ordered:</h5>
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
    //  SignInClients 
}


export default connect(mapStateToProps, mapDispatchToProps)(Panier)