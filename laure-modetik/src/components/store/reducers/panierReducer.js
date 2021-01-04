const initialState = {
    paniers: []
}


const paniersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LIST-PANIERS": 
            return {
                ...state,
                paniers: action.paniers
            };
        case "ADD-PANIER": 
            return {
                ...state,
                paniers: [...state.paniers, action.paniers]
            }; 
            case "DELETE":
            let paniers = state.paniers.slice()
            for(let i=0; i<paniers.length; i++){
                if(paniers[i].panier_id === action.id){
                    paniers.splice(i,1)
                }
            }  
            return { ...state, paniers:paniers} 
        default: {
            return {
                ...state
            };
        }
    }
}

export default paniersReducer  