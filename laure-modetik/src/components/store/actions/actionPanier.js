export const getListPaniers = (paniers) => ({ 
    
    type: "LIST-PANIERS",
    paniers: paniers
})

export const addPanier = (panier) => ({
    type: "ADD-PANIER",
    panier: panier
})   

export const deletePanier = (id ) => ({
    type: 'DELETE_PRODUCT',
    id: id
});