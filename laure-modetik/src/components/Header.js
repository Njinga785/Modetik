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
 import { clearPanier } from './store/actions/actionPanier'


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
        
    }

    signOutAdmin = () => {
        localStorage.clear();

        this.props.signOut();
        this.props.history.push('/');
    }

    signOutClient = () => {
        localStorage.clear();
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
                    <Navbar collapseonselect='true' expand="lg" bg="light" variant="light" fixed='top'>
                        <Navbar.Brand href="#home"><img src={logo} width='40' height='40' alt="logo" />
                            <div className='titre'> <img src={titre} alt='titre' /></div>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/admin/addproduct"><h6 className="linkText">AjoutProduct</h6></Nav.Link>
                                <Nav.Link as={Link} to="/admin/addcategorie"><h6 className="linkText">AjoutCategorie</h6></Nav.Link>
                                <Nav.Link as={Link} to="/admin/produistadmin"><h6 className="linkText">ProduitsAdmin</h6></Nav.Link>
                                <Nav.Link as={Link} to="/admin/editclient/:id"><h6 className="linkText">ClientsAdmin</h6></Nav.Link>
                            </Nav> 
                            <Nav>
                            <Navbar.Brand href="/" onClick={this.signOutAdmin}><h6 className="linkText">Deconnexion</h6></Navbar.Brand>
                            </Nav>
                        
                        </Navbar.Collapse>
                       
                    </Navbar >


                );

            } else {

                return (
                    <Navbar collapseonselect='true' expand="lg" bg="light" variant="light" fixed='top'>


                        <Navbar.Brand href="#home"><img src={logo} width='40' height='40' alt="logo" />
                            <div className='titre'> <img src={titre} alt='titre' /></div>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav  className=" align-right">
                                <Nav.Link as={Link} to="/admin/sign-up"><h6 className="linkText">InscriptionAdmin</h6></Nav.Link>


                                <Nav.Link as={Link} to="/admin/sign-in"><h6 className="linkText">ConnexionAdmin</h6></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                );

            }
        } else if (localStorage.getItem("tokenClient")) {
            return (
                <Navbar collapseonselect='true' expand="lg" bg="light" variant="light" fixed='top'>
                    <Navbar.Brand href="#home"><img src={logo} width='40' height='40' alt="logo" />
                        <div className='titre'> <img src={titre} alt='titre' /></div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/"><AiOutlineHome color='green' size='2rem' /></Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/profile/"><AiOutlineUser color='green' size='2rem' /></Nav.Link>

                            <Nav.Link as={Link} to="/panier"><AiOutlineShoppingCart color='green' size='2rem' /> {this.state.quantite}</Nav.Link>

                            <Nav.Link as={Link} to="/mespaniers"><h5 className="linkText">Mespaniers</h5></Nav.Link>
                            <Navbar.Brand href="/" onClick={this.signOutClient}><h5 className="linkText">Deconnexion</h5></Navbar.Brand>
                        </Nav>


                    </Navbar.Collapse>
                </Navbar>
            )


        } else {

            return (
                <Navbar collapseonselect='true' expand="lg" bg="light" variant="light" fixed='top'>
                    <Navbar.Brand href="#home"><img src={logo} width='40' height='40' alt="logo" />
                        <div className='titre'> <img src={titre} alt='titre' /></div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/"><AiOutlineHome color='green' size='2rem' /></Nav.Link>
                        </Nav>
                        <Nav >
                            <Nav.Link as={Link} to="/sign-up"><h5 className="linkText">Inscription</h5></Nav.Link>
                            <Nav.Link as={Link} to="/sign-in"><h5 className="linkText">Connexion</h5></Nav.Link>
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
