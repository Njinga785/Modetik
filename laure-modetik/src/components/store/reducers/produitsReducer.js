const initialState = {
    produits: [],
    categorie: []
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
            for (let i = 0; i < produits.length; i++) {
                if (produits[i].produit_id === action.id) {
                    produits.splice(i, 1)
                }
            }
            return {
                ...state, produits: produits
            };
        case "GET_GATEGORIE":
            return {
                ...state,
                categorie: [...state.categorie, { id: action.id, categorieNom: action.categorieNom }]
            }
        default:
            return state
                
            
    }
}


export default produitsReducer  