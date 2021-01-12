
export const getListProduits = (produits) => ({ 
    
    type: "LIST-PRODUITS",
    produits: produits
})

export const addProduit = (produit) => ({
    type: "ADD-PRODUIT",
    produit: produit
})   

export const deleteProcduits = (id ) => ({
    type: 'DELETE_PRODUIT',
    id: id
});