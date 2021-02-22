const initialState = {
    token: "",
    firstName: "",
    email: "",
    id: "", 
    panier_client: [], 
    panier: []
    
}

const clientReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGN-INCLIENTS": 
        console.log(action)
            return {
                ...state,
                token: action.token,
                firstName: action.firstName,
                email: action.email,
                profile: action.profile,
                id: action.id
            };
        case "SIGN-OUTCLIENTS": 
            return {
                ...state, 
                token: "",
                firstName: "",
                email: "",
                profile: "",
                id: "", 
                panier: []
                
            }; 
            case "UPDATE_PROFILE":
            return {
                ...state,
                firstName: action.firstName, 
                lastName: action.lastName,
                email: action.email,
                password: action.password, 
                
                
            };
            case "PANIER-CLIENT": 
            console.log(action.panier_client)
                return { 
                    ...state,
                    panier_client: [...action.panier_client]

                }; 
                case "DELETE":
                    let paniers = state.panier_client.slice()
                    for(let i = 0; i < paniers.length; i++){
                        if(paniers[i].panier.id === action.id){
                            paniers.splice(i,1)
                        }
                    }
                    return {
                        ...state,
                        panier_client : paniers
                        
                    }
        
        default: {
            return  state
               
            
        }
    }
}

export default clientReducer