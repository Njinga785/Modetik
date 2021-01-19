export const getListProduis = (produits) => ({ 
    
    type: "LIST-PANIERS",
    produits: produits
})

export const addToPanier = (id) => ({
    type: "ADD-TO-PANIER",
    id: id
})   

export const deleteFromPanier = (id ) => ({
    type: "DELETE",
    id: id
}) 



