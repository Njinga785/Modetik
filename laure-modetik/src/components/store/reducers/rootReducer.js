import adminReducer from './adminReducer' 
import clientReducer from './clientReducer'
import panierReducer from './panierReducer'
import productsReducer from './productsReducer' 
import {combineReducers} from 'redux'  

const rootReducer = combineReducers({
    adminReducer, 
    clientReducer,
    panierReducer,
    productsReducer, 
    
}) 

export default rootReducer