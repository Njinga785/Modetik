export const getListPanierItem = (panieritem) => ({ 
    
    type: "LIST-PANIERS",
    panieritem: panieritem
})

export const addToPanierItem = (id, panier_id, produit_id, quantite) => ({
    type: "ADD-TO-PANIERITEM",
    id: id,
    panier_id: panier_id,
    produit_id: produit_id,
    quantite: quantite
})   

export const deleteFromPanierItem = (id ) => ({
    type: "DELETE",
    id: id
}) 