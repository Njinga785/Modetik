// import { LIST-PRODUITS } from './actions/actionProduits'

const initialState = {
    // paniers: [],
    // produits: [],
    addedProduits: [],
    // quantite: 1,
    // total: 0
}


const paniersReducer = (state = initialState, action) => {
    switch (action.type) {
        // case "LIST-PANIERS":
        //     return {
        //         ...state,
        //         paniers: action.paniers
        //     };
        case "ADD-TO-PANIER":
            // let addedProduit = state.produits.find(produit => produit.id === action.id)
            let existed_produit = state.addedProduits.find(produit => action.id === produit.id)

            if (existed_produit) { 
                // addedProduit = []
                existed_produit.quantite += 1
                return {
                    ...state,
                    // total: state.total + addedProduit.price
                }
            }
            else {  
                let newProduit = {id: action.id, quantite: 1}
                // addedProduit = []
                // existed_produit.quantite = null;
                // let newTotal = state.total + addedProduit.price

                return {
                    ...state,
                    addedProduits: [...state.addedProduits,  newProduit],
                    // total: newTotal
                }
            };
        // case "DELETE":
        //     let paniers = state.paniers.slice()
        //     for (let i = 0; i < paniers.length; i++) {
        //         if (paniers[i].panier_id === action.id) {
        //             paniers.splice(i, 1)
        //         }
        //     }
        //     return { ...state, paniers: paniers }
        default: {
            return state


        }
    }
}

export default paniersReducer  