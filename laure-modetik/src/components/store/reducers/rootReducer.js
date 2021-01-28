import adminReducer from './adminReducer' 
import clientReducer from './clientReducer'
import panierReducer from './panierReducer'
import produitsReducer from './produitsReducer' 

import {combineReducers} from 'redux'  

const rootReducer = combineReducers({
    adminReducer, 
    clientReducer,
    panierReducer,
    produitsReducer, 
    
    
}) 

export default rootReducer