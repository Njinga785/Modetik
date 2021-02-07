export const getListPanier = (paniers) => ({ 
    
    type: "LIST-PANIERS",
    paniers: paniers
})

export const addToPanier = (id) => ({
    type: "ADD-TO-PANIER",
    id: id
    // quantite: quantite
    // panier_id: panier_id,
    // produit_id: produit_id,
    // quantite: quantite
})   

export const deleteFromPanier = (id ) => ({
    type: "DELETE",
    id: id
}) 



