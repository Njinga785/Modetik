import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import logoBasket from '../assets/icones/shopping-cart.png';
import logoProfil from '../assets/icones/utilisateur.png';
import logoHome from '../assets/icones/home.png';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { SignInClients, signOutClients } from './store/actions/actionClient'
import { SignIn, signOut } from './store/actions/actionAdmin'
import Navbar from 'react-bootstrap/esm/Navbar';
import { getListProduits } from './store/actions/actionProduits'
import { panierClient } from './store/actions/actionClient'
// import axios from 'axios' 
import {clearPanier} from './store/actions/actionPanier'
// import jwt from "jsonwebtoken";

export class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            quantite: 0, 
            produits: [], 
            categorieNom: '',
            addedProduits: []
        }
        // this.props.getListProduits = this.props.getListProduits.bind(this)
    }

    signOutAdmin = () => {
        localStorage.clear();
       
        this.props.signOut();
        this.props.history.push('/');
    }

    signOutClient = () => {
        localStorage.clear();
        // this.props.addedProduits()
        this.props.signOutClients() 
        this.props.clearPanier()
        this.props.history.push('/');
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


    //     axios.get(`http://localhost:3003/panier/${this.props.id}`, {
    //   headers: { authorization: `Bearer ${localStorage.getItem('tokenClient')}` }
    // })
    //   .then((response) => {

    //     console.log(response.data)
    //     this.setState({ produits: response.data })

    //     this.props.panierClient(response.data)

    //   })
    //   .catch(error => {
    //     console.error(error)
    //   })

    //     axios.get('http://localhost:3003/produits')
    //         .then((response) => {

    //             console.log(response.data)
    //             this.setState({ produits: response.data })

    //             this.props.getListProduits(response.data)

    //         })
    //         .catch(error => {
    //             console.error(error)
    //         }) 

            // let id = this.props.match.params.id
            // axios.get(`http://localhost:3003/produits/${id}`)
            // .then((response) => {
            //     console.log(response) 
            //     // this.props.addToPanier(response.data)
            //     this.setState({
            //         produit: response.data[0]
            //     })

            // })

            // axios.post(`http://localhost:3003/categorie`, {
            //     categorieNom: this.state.categorieNom },
            //     // admin_id: localStorage.getItem('id')
            
            //     {
            //         headers: { authorization: `Bearer ${localStorage.getItem('tokenAdmin')}` }
    
    
            //     })
            //     .then((response) => {
            //         console.log(response)
            //         // this.props.addProduct()
            //     })
            //     .catch((err) => {
            //         console.log(err)
            //     })
    }
    render() {

        if (this.props.location.pathname.includes("admin")) {
            if (localStorage.getItem("tokenAdmin")) {

                return (
                    <Navbar>
                        <Nav>
                            <Nav.Link as={Link} to="/admin/addproduct">AddProduct</Nav.Link>
                            <Nav.Link as={Link} to="/admin/addcategorie">AddCategorie</Nav.Link>
                            <Nav.Link as={Link} to="/admin/produistadmin">ProductsAdmin</Nav.Link>
                            <Nav.Link as={Link} to="/admin/editclient/:id">ClientsAdmin</Nav.Link>
                            <Nav.Link as={Link} to="/admin/dashboard">DashboardAdmin</Nav.Link>
                        </Nav>
                        <Navbar.Brand href="/" onClick={this.signOutAdmin} >Deconnexion</Navbar.Brand>

                    </Navbar>


                );

            } else {

                return (
                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/admin/sign-up">SignUpAdmin</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/admin/sign-in">SignInAdmin</Nav.Link>
                        </Nav.Item>

                    </Nav>
                );

            }
        } else if (localStorage.getItem("tokenClient")) {
            return (
                <Navbar className="userNavbar">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/"><img src={logoHome} alt="home" /></Nav.Link>
                        <Nav.Link as={Link} to="/mespaniers">Mespaniers</Nav.Link>
                        <Nav.Link as={Link} to="/profile/"><img src={logoProfil} alt="profil" /></Nav.Link>
                        <Nav.Link as={Link} to="/panier"><img src={logoBasket} alt="panier" /> {this.state.quantite}</Nav.Link>
                    </Nav>

                    <Navbar.Brand href="/" onClick={this.signOutClient} >Deconnexion</Navbar.Brand>

                </Navbar>
            )


        } else {

            return (
                <Navbar>
                    <Nav variant="pills">

                        <Nav.Link as={Link} to="/"><img src={logoHome} alt="home" /></Nav.Link>
                        <Nav.Link as={Link} to="/panier"><img src={logoBasket} alt="panier" /> {this.state.quantite}</Nav.Link>
                        <Nav.Link as={Link} to="/sign-up">SignUp</Nav.Link>
                        <Nav.Link as={Link} to="/sign-in">Signin</Nav.Link>


                    </Nav>
                </Navbar>
            );

        }
    }
}

const mapStateToProps = (state) => ({
    produits: state.panierReducer.addedProduits, 
    id: state.clientReducer.profile, 
    addedProduits: state.panierReducer.addedProduits, 
    // token: state.adminReduver.token

})

const mapDispatchToProps = {
    SignInClients,
    signOutClients,
    SignIn,
    signOut,
    getListProduits,
    panierClient, 
    clearPanier

}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
