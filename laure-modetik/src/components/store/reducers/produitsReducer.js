const initialState = {
    produits: []
}


const produitsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LIST-PRODUITS": 
            return {
                ...state,
                produits: action.produits
            };
        case "ADD-PRODUIT": 
            return {
                ...state,
                produits: [...state.produits, action.produit]
            }; 
            case "DELETE":
            let produits = state.produits.slice()
            for(let i=0; i<produits.length; i++){
                if(produits[i].produit_id === action.id){
                    produits.splice(i,1)
                }
            }  
            return { ...state, produits:produits} 
        default: {
            return {
                ...state
            };
        }
    }
}

export default produitsReducer  