const initialState = {
    token: "",
    firstName: "",
    email: "",
    id: ""
    
}

const clientReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGN-INCLIENTS":
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
                id: ""
                
            }
        
        default: {
            return {
                ...state
            }
        }
    }
}

export default clientReducer