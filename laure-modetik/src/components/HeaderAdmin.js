import React, { Component } from 'react'
import {NavLink} from "react-router-dom"
import Nav from 'react-bootstrap/Nav';

export class HeaderAdmin extends Component { 
    constructor(props) {
        super(props)
        this.state= {
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
            <Nav.Item as="li">
            <NavLink className="white"  activeClassName="active" exact to="/productsList">Products List</NavLink>
        </Nav.Item>

        <Nav.Item as="li">
            <NavLink className="white"  activeClassName="active" exact to="/addproduct">Add a product</NavLink>
        </Nav.Item>
               
            </header>
        )
    }
}

export default HeaderAdmin
