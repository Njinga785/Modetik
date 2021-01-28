import React, { Component } from 'react'

export class Filter extends Component {
    render() {
        return (
            <div>
                <div className="filter-result">{this.props.count} produits</div>
                <div className="filter-order"> Order <select>
                    <option>Categorie</option>
                    <option value="vêtements">Vêtements</option>
                    <option value="bijoux">Bijoux</option>
                    <option value="déco">Déco</option>
                    <option value="accessoires">Accessoires</option>
                    
                    </select></div>
            </div>
        )
    }
}

export default Filter
