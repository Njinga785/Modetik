const initialState = {
    token: "",
    name: "",
    email: "",
    id: ""
    
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
        
        default: {
            return {
                ...state
            }
        }
    }
}

export default adminReducer