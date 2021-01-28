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
                
            }; 
            case "UPDATE_PROFILE":
            return {
                ...state,
                firstName: action.firstName, 
                lastName: action.lastName,
                email: action.email,
                password: action.password
                
            };
        
        default: {
            return {
                ...state
            }
        }
    }
}

export default clientReducer