import React, { Component } from 'react'
import ProductList from './ProductList'

export class Home extends Component {
    render() {
        return (
            <div className="home">
            <div> 
            <ProductList/>
            </div>
            </div>
        )
    }
}

export default Home
