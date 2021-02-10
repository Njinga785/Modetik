export const SignInClients = (token, firstName, email, profile, id) => ({
    type: "SIGN-INCLIENTS",
    token: token,
    firstName: firstName,
    email: email, 
    profile: profile,
    id: id
}) 

export const updateProfile = (firstName, lastName, email, password) => ({
    type: 'UPDATE_PROFILE', 
    firstName: firstName, 
    lastName: lastName, 
    email: email, 
    password: password
}) 

export const getListPanier = (paniers) => ({ 
    
    type: "LIST-PANIERS",
    paniers: paniers
})

export const signOutClients = () => ({
    type: "SIGN-OUTCLIENTS"
}) 

export const clientProduits = (client_produits) => ({
    type: "CLIENT_PRODUITS"
})
 

