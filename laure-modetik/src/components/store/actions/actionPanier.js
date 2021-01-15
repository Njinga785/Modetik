export const getListProduis = (produits) => ({ 
    
    type: "LIST-PANIERS",
    produits: produits
})

export const addToPanier = (id) => ({
    type: "ADD-TO-PANIER",
    id: id
})   

export const deletePanier = (id ) => ({
    type: 'DELETE_PRODUCT',
    id: id
});