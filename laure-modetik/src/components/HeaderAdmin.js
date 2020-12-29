import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';

export class HeaderAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            profile: this.props.profile
        }

        //     this.SignOut = this.SignOut.bind(this)
        // }

        // SignOut() {
        //     localStorage.clear()
        //     this.props.signOut()
    }
    render() {
        return (
            <header className='black'>
                <Nav.Item>
                    <Nav.Link as={Link} to="#">Nom du Site</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/sign-upAdmin">SignUpAdmin</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/sign-inAdmin">SignInAdmin</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/addcategorie">AddCategorie</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/addproduct">AddProduct</Nav.Link>
                </Nav.Item>


            </header>
        )
    }
}

export default HeaderAdmin
