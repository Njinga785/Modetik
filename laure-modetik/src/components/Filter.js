import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategorie } from './store/actions/actionProduits'
import axios from 'axios';


export class Filter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
            
        }
        
    }

    componentDidMount() {
        axios.get('http://localhost:3003/categorie')
            .then((response) => {
                console.log(this.props)
                console.log(response.data)
                this.props.getCategorie(response.data)
                this.setState({ categories: response.data })

            })
            .catch(error => {
                console.error(error)
            })
    } 

    
    render() {
        const categories = this.state.categories
        return (
            <div className="filter">
                
                    <div className="filter-result">{this.props.count} produits</div>
                    <div className="filter-order"> Filtre {''} 
                    <select className="selection" value={this.state.value} onChange={this.props.filterProduits}>
                        <option>Categorie</option>
                        {categories && categories.map(categorie => {
                            
                            return (
                                <option value={categorie.id} key={categorie.id}>{categorie.categorieNom}</option>
                            )
                        })}
                    </select></div>

            
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    categories: state.produitsReducer.categorie
})

const mapDispatchToProps = {
    getCategorie
}


export default connect(mapStateToProps, mapDispatchToProps)(Filter)
