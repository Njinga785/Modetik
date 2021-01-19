export const SignInClients = (token, firstName, email, profile, id) => ({
    type: "SIGN-INCLIENTS",
    token: token,
    firstName: firstName,
    email: email, 
    profile: profile,
    id: id
})

export const signOutClients = () => ({
    type: "SIGN-OUTCLIENTS"
}) 

export const clientProduits = (client_produits) => ({
    type: "CLIENT_PRODUITS"
})
 

