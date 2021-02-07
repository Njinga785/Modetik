
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

export const getCategorie = (id, categorieNom) => ({
    type: 'GET_CATEGORY', 
    id: id, 
    categorieNom: categorieNom
})