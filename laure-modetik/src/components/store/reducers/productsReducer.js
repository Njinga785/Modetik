const initialState = {
    products: []
}


const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LIST-PRODUCTS": 
            return {
                ...state,
                products: action.products
            };
        case "ADD-PRODUCT": 
            return {
                ...state,
                products: [...state.products, action.product]
            }; 
            case "DELETE":
            let products = state.products.slice()
            for(let i=0; i<products.length; i++){
                if(products[i].product_id === action.id){
                    products.splice(i,1)
                }
            }  
            return { ...state, products:products} 
        default: {
            return {
                ...state
            };
        }
    }
}

export default productsReducer  