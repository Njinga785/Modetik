import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Table from 'react-bootstrap/Table';


export class Panier extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total: '',
            // date: '',
            // client_id: ''
        }
    }

    async validatedPart() {
        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${this.props.token}`
        // }
        const articles = {
            panier: this.props.panier, 
            quantite: this.props.quantite

        }
        console.log(this.props.panier )
        axios.post('http://localhost:3003/panier', articles, { headers : { authorization: `Bearer ${this.props.token}`}
            

            //produit_id: this.props.produit
            //    panier: this.props.panier

        })
            .then((response) => {
                console.log(response)

            })
            .catch((err) => {
                console.log(err)
            })


    }
    componentDidMount() {
        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${this.props.token}`
        // }
        axios.get('http://localhost:3003/panier', { headers : { authorization: `Bearer ${this.props.token}`}})
            .then((response) => {
                console.log(response)

            })
            .catch((err) => {
                console.log(err)
            })

    }


    render() {
         let produits = this.props.produits

        let panier = this.props.panier 
        
        

        // let produitPanier = []

        // for (let produit of produits) {
        //     for (let id of panier) {
        //         if (produit.produit_id == id) {
        //             produitPanier.push(produit)
        //         }
        //     }            
        // }


        // let panierMaped = []
        // let total = 0

        // for (let i = 0; i<produitPanier.length; i++) {

        //         panierMaped.push(<tr>
        //             <td>{produitPanier[i].nom}</td>
        //             <td>{produitPanier[i].description}</td>
        //             <td>{produitPanier[i].category}</td>
        //             <td><img className="images" src={produitPanier[i].photo}/></td>
        //             <td>{produitPanier[i].prix}€</td>                
        //         </tr>)   



        //     let prix


        //         prix = produitPanier[i].prix



        //     prix = parseFloat(prix)


        //     total = total + prix
        // }

        return (
            <div>

                <Table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Photo</th>
                            <th>Prix</th>


                        </tr>
                    </thead>

                    {/* <tbody>
                    {panierMaped}
                    </tbody> */}
                </Table>
                {/* 
            <p>Total: {total}€ </p> */}
                <Button variant="success" onClick={() => this.validatedPart()}>Order</Button>

            </div>
        )
    }



}

const mapStateToProps = (state) => ({
    panier: state.panierReducer.paniers,
    produits: state.produitsReducer.produits,
    token: state.clientReducer.token, 
    quantite: state.panierRe.quantite



})
const mapDispatchToProps = {
    // SignInClients 
}


export default connect(mapStateToProps, mapDispatchToProps)(Panier)