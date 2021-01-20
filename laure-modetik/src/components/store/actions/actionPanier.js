export const getListProduis = (produits) => ({ 
    
    type: "LIST-PANIERS",
    produits: produits
})

export const addToPanier = (id) => ({
    type: "ADD-TO-PANIER",
    id: id,
    // panier_id: panier_id,
    // produit_id: produit_id,
    // quantite: quantite
})   

export const deleteFromPanier = (id ) => ({
    type: "DELETE",
    id: id
}) 



