const initialState = {
    token: "",
    firstName: "",
    email: "",
    id: ""
    
}

const clientReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGN-INCLIENT":
            return {
                ...state,
                token: action.token,
                firstName: action.firstName,
                email: action.email,
                id: action.id
            };
        case "SIGN-OUTCLIENT": 
            return {
                ...state, 
                token: "",
                firstName: "",
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

export default clientReducer