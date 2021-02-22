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
        case "UPDATE-PRODUIT": 
        return {
            ...state, 
            nom: action.nom, 
            prix: action.prix,
            description: action.description, 
            photo: action.photo,
            categorie_id: action.categorie_id 

        }
        case "DELETE":
            let new_produits = state.produits.filter(produit=> action.id !== produit.id) 

            return{
                ...state,
                produits: new_produits,
                // total: newTotal
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