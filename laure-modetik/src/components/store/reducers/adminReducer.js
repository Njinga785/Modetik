const initialState = {
    token: "",
    name: "",
    email: "",
    id: ""
    
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGN-IN":
            return {
                ...state,
                token: action.token,
                name: action.name,
                email: action.email,
                id: action.id
            };
        case "SIGN-OUT": 
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