// import React, { Component } from 'react'
// import {connect} from 'react-redux'
// import Button from 'react-bootstrap/Button';
// import axios from 'axios'
// import Table from 'react-bootstrap/Table';


// export class Panier extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             total: '',
//             date: '',
//             client_id: ''
//         }
//     } 

//     async validatedPart(){
        
    
        // axios.post('http://localhost:3003/panier', {
//            client_id: this.props.id, 
//            produit_id: this.props.produit

//         })
//             .then((response) => {
//                 console.log(response)

//             })
//             .catch((err) => {
//                 console.log(err)
//             })
        
        
//     }
    

    
//     render() { 
//         let produits = this.props.produits
        
//         let panier = this.props.panier
        
//         let produitPanier = []

//         for (let produit of produits) {
//             for (let id of panier) {
//                 if (produit.produit_id == id) {
//                     produitPanier.push(produit)
//                 }
//             }            
//         }
      
        
//         let panierMaped = []
//         let total = 0

//         for (let i = 0; i<produitPanier.length; i++) {
            
//                 panierMaped.push(<tr>
//                     <td>{produitPanier[i].nom}</td>
//                     <td>{produitPanier[i].description}</td>
//                     <td>{produitPanier[i].category}</td>
//                     <td><img className="images" src={produitPanier[i].photo}/></td>
//                     <td>{produitPanier[i].prix}€</td>                
//                 </tr>)   
            
            
            
//             let prix

            
//                 prix = produitPanier[i].prix
            
            

//             prix = parseFloat(prix)
            
            
//             total = total + prix
//         }

//         return (
//             <div>
                
//                 <Table>
//                     <thead>
//                         <tr>
//                             <th>Nom</th>
//                             <th>Description</th>
//                             <th>Photo</th>
//                             <th>Prix</th>
                           
                            
//                         </tr>
//                     </thead>

//                     <tbody>
//                     {panierMaped}
//                     </tbody>
//             </Table>

//             <p>Total: {total}€ </p>
//             <Button onClick={this.validatedPanier} variant="success">Order</Button>
           
//             </div>
//         )
//     }



// } 

// const mapStateToProps = (state) => ({
//     panier: state.panierReducer.panier,
//     produits: state.produitsReducer.produits,
//     id:state.clientReducer.id,
    
    
    
// })

// export default connect(mapStateToProps, mapDispatchToProps) (Panier)