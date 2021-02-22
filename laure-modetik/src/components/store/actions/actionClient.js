


export const SignInClients = (token, firstName, email, id) => ({
    type: "SIGN-INCLIENTS",
    token: token,
    firstName: firstName,
    email: email, 
    
    id: id
}) 

export const updateProfile = (firstName, lastName, email, password) => ({
    type: 'UPDATE_PROFILE', 
    firstName: firstName, 
    lastName: lastName, 
    email: email, 
    password: password, 
    
}) 

export const signOutClients = () => ({
    type: "SIGN-OUTCLIENTS"
}) 

export const panierClient = (panier_client) => ({ 
    
    type: "PANIER-CLIENT",
    panier_client: panier_client
})

export const deletePanierClient = (id) => ({
    type: "DELETE", 
    id: id
})
 

