import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';

import logo from '../assets/images/imageonline-co-whitebackgroundremoved 3.png';
import titre from '../assets/icones/MODETIK.png';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { SignInClients, signOutClients } from './store/actions/actionClient'
import { SignIn, signOut } from './store/actions/actionAdmin'
import Navbar from 'react-bootstrap/esm/Navbar';
import { getListProduits } from './store/actions/actionProduits'
import { panierClient } from './store/actions/actionClient'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineHome } from 'react-icons/ai';
// import axios from 'axios' 
import { clearPanier } from './store/actions/actionPanier'
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

    }
    render() {

        if (this.props.location.pathname.includes("admin")) {
            if (localStorage.getItem("tokenAdmin")) {

                return (
                    <Navbar collapseonselect='true' expand="lg" bg="dark" variant="dark" fixed='top'>
                        <Navbar.Brand href="#home"><img src={logo} width='40' height='40' alt="logo" />
                            <div className='titre'> <img src={titre} alt='titre' /></div>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className='justify-content-between'>
                                <Nav.Link as={Link} to="/admin/addproduct">AddProduct</Nav.Link>
                                <Nav.Link as={Link} to="/admin/addcategorie">AddCategorie</Nav.Link>
                                <Nav.Link as={Link} to="/admin/produistadmin">ProductsAdmin</Nav.Link>
                                <Nav.Link as={Link} to="/admin/editclient/:id">ClientsAdmin</Nav.Link>
                                <Navbar.Brand href="/" onClick={this.signOutAdmin} >Deconnexion</Navbar.Brand>
                            </Nav>
                        </Navbar.Collapse>

                    </Navbar >


                );

            } else {

                return (
                    <Navbar collapseonselect='true' expand="lg" bg="dark" variant="dark" fixed='top'>
                        
                            
                                <Navbar.Brand href="#home"><img src={logo} width='40' height='40' alt="logo" />
                                    <div className='titre'> <img src={titre} alt='titre' /></div>
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className='justify-content-between'>
                                <Nav.Link as={Link} to="/admin/sign-up">SignUpAdmin</Nav.Link>


                                <Nav.Link as={Link} to="/admin/sign-in">SignInAdmin</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                );

            }
        } else if (localStorage.getItem("tokenClient")) {
            return (
                <Navbar collapseonselect='true' expand="lg" bg="dark" variant="dark" fixed='top'>
                    <Navbar.Brand href="#home"><img src={logo} width='40' height='40' alt="logo" />
                        <div className='titre'> <img src={titre} alt='titre' /></div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/"><AiOutlineHome color='black' size='2rem' /></Nav.Link>
                        </Nav>
                        <Nav className='justify-content-between'>
                            <Nav.Link as={Link} to="/profile/"><AiOutlineUser color='black' size='2rem' /></Nav.Link>

                            <Nav.Link as={Link} to="/panier"><AiOutlineShoppingCart color='black' size='2rem' /> {this.state.quantite}</Nav.Link>

                            <Nav.Link as={Link} to="/mespaniers">Mespaniers</Nav.Link>
                            <Navbar.Brand href="/" onClick={this.signOutClient} >Deconnexion</Navbar.Brand>
                        </Nav>


                    </Navbar.Collapse>
                </Navbar>
            )


        } else {

            return (
                <Navbar collapseonselect='true' expand="lg" bg="dark" variant="dark" fixed='top'>
                    <Navbar.Brand href="#home"><img src={logo} width='40' height='40' alt="logo" />
                        <div className='titre'> <img src={titre} alt='titre' /></div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/"><AiOutlineHome color='black' size='2rem' /></Nav.Link>
                        </Nav>
                        <Nav>

                            <Nav.Link as={Link} to="/sign-up">SignUp</Nav.Link>
                            <Nav.Link as={Link} to="/sign-in">Signin</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
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
