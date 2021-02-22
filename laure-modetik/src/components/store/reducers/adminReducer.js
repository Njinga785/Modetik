const initialState = {
    token: "",
    name: "",
    email: "",
    id: "",
    admin_products: [],
    
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGN-INADMIN":
            return {
                ...state,
                token: action.token,
                name: action.name,
                email: action.email,
                id: action.id
            };
        case "SIGN-OUTADMIN": 
            return {
                ...state, 
                token: "",
                name: "",
                email: "",
                id: ""
                
            }
            case "ADMIN-PRODUCTS":
                return {
                    ...state,
                    admin_products: [...state.admin_products, action.admin_products]
                }
            case "DELETE":
                let products = state.admin_products.slice()
                for(let i = 0; i < products.length; i++){
                    if(products[i].product_id === action.id){
                        products.splice(i,1)
                    }
                }
                return {
                    ...state,
                    admin_products : products
                    
                }
        default: {
            return state
                
            
        }
    }
}

export default adminReducer