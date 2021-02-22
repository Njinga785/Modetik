const initialState = {
    //  paniers: [],
    // numberPanier: 0,
    addedProduits: [],
    // quantite: 1,
    // total: 0
}


const paniersReducer = (state = initialState, action) => {
    switch (action.type) { 
        
        // case "LIST-PANIERS": 
        // return {
        //     ...state, 
        //     paniers: action.paniers
        // };
        
        case "ADD-TO-PANIER":
            // let addedProduit = state.produits.find(produit => produit.id === action.id)
            let existed_produit = state.addedProduits.find(produit => action.id === produit.id)

            if (existed_produit) { 
                
                existed_produit.quantite += 1
                return {
                    ...state,
                    // total: state.total + addedProduit.price
                }
            }
            else {  
                let newProduit = {id: action.id, quantite: 1}
                
                // existed_produit.quantite = null;
                // let newTotal = state.total + newProduit.price

                return {
                    ...state,
                    addedProduits: [...state.addedProduits,  newProduit],
                    // total: newTotal
                }
            };

            case "REMOVE_PRODUIT":
                // let produitToRemove= state.addedProduits.find(produit=> action.id === produit.id)
        let new_produits = state.addedProduits.filter(produit=> action.id !== produit.id) 

        return{
            ...state,
            addedProduits: new_produits,
            // total: newTotal
        }; 

        case "ADD_QUANTITE":
            let added_Produit = state.addedProduits.find(produit=> produit.id === action.id)
            if (added_Produit) {
          added_Produit.quantite++ 
        //   let newTotal = state.total + addedItem.price
          return{
            ...state, addedProduits: [...state.addedProduits]
            //   total: newTotal 
        }
          }; 
          break
          case "SUB_QUANTITE": 
          let produitadd = state.addedProduits.find(produit=> produit.id === action.id) 
        //if the qt == 0 then it should be removed 
        if (produitadd) 
        produitadd.quantite-- 
        return{
            ...state, addedProduits: [...state.addedProduits]
        }; 

        case "CLEAR_PANIER": 
        return {
            addedProduits: []
        }
        
        default: {
            return state


        }
    }
}

export default paniersReducer  