import React, { Component } from 'react'
// import { NavLink } from "react-router-dom"
import {Link} from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
// import '../style/Header.css'

export class HeaderHome extends Component {
    render() {
        return (
            <header className='black'>
                <Nav.Item>
                    <Nav.Link as={Link} to="/sign-up">SignUp</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/sign-in">SignInClients</Nav.Link>
                </Nav.Item> 
                <Nav.Item>
                <Nav.Link as={Link} to="/sign-upAdmin">SignUpAdmin</Nav.Link>
            </Nav.Item> 
                <Nav.Item>
                <Nav.Link as={Link} to="/sign-inAdmin">SignInAdmin</Nav.Link>
            </Nav.Item>
            </header>
        )
    }
}

export default HeaderHome

