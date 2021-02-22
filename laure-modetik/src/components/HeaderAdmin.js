import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import logoBasket from '../assets/icones/shopping-cart.png';
import logoHome from '../assets/icones/home.png';
// import logoProfile from '../assets/icones/utilisateur.png';
import { connect } from 'react-redux'

export class HeaderAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            profile: this.props.profile,
            quantite: 0
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
        //     this.SignOut = this.SignOut.bind(this)
        // }

        // SignOut() {
        //     localStorage.clear()
        //     this.props.signOut()
    
    render() { 
   
        return (
            <Nav>
                <Nav.Item>
                    <Nav.Link as={Link} to="/"><img src={logoHome} alt="home" /></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/sign-up">SignUp</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/sign-in">Signin</Nav.Link>
                </Nav.Item>
                 <Nav.Item>
                    <Nav.Link as={Link} to="/mespaniers">Mespaniers</Nav.Link>
                </Nav.Item> 
                <Nav.Item>
                    <Nav.Link as={Link} to="/admin/sign-up">SignUpAdmin</Nav.Link>
                </Nav.Item>
                 <Nav.Item>
                    <Nav.Link as={Link} to="/admin/produistadmin">ProductsAdmin</Nav.Link>
                </Nav.Item> 
                <Nav.Item>
                    <Nav.Link as={Link} to="/admin/dashboard">DashboardAdmin</Nav.Link>
                </Nav.Item> 
                <Nav.Item>
                    <Nav.Link as={Link} to="/admin/editclient/:id">ClientsAdmin</Nav.Link>
                </Nav.Item> 
                <Nav.Item>
                    <Nav.Link as={Link} to="/admin/sign-in">SignInAdmin</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/admin/addcategorie">AddCategorie</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/admin/addproduct">AddProduct</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/profile/:id">ClientProfile</Nav.Link>
                </Nav.Item>
               
                <Nav.Item>
                    <Nav.Link as={Link} to="/panier"><img src={logoBasket} alt="panier" /> {this.state.quantite}</Nav.Link>
                </Nav.Item>



            </Nav>
        )
    }
}

const mapStateToProps = (state) => ({
    produits: state.panierReducer.addedProduits

})

export default connect(mapStateToProps, null)(HeaderAdmin)
