import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
// import { NavLink } from "react-router-dom"
import { Link } from "react-router-dom"
import HeaderAdmin from './HeaderAdmin'
// import Nav from 'react-bootstrap/Nav';
// import '../style/Header.css'

export class HeaderHome extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="#home">MODETIK</Navbar.Brand>
            
                <HeaderAdmin/>
                
        
        </Navbar> 



            
        )
    }
}

export default HeaderHome

