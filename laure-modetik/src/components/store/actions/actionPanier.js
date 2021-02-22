export const getListPaniers = (paniers) => ({
    type: "LIST-PANIER",
    paniers: paniers
})

export const addToPanier = (id, quantite) => ({
    type: "ADD-TO-PANIER",
    id: id,
     quantite: quantite
    // panier_id: panier_id,
    // produit_id: produit_id,
    // quantite: quantite
})   

export const removeProduit = (id ) => ({
    type: "REMOVE_PRODUIT",
    id: id
}) 

export const addQuantite = (id) => ({
    type: "ADD_QUANTITE",
    id: id, 
    
})

export const subtractQuantite = (id, quantite ) => ({
    type: "SUB_QUANTITE",
    id: id,
    quantite: quantite
}) 

export const clearPanier = () => ({
    type: "CLEAR_PANIER"
})



