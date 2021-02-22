
export const getListProduits = (produits) => ({ 
    
    type: "LIST-PRODUITS",
    produits: produits
})

export const addProduit = (produit) => ({
    type: "ADD-PRODUIT",
    produit: produit
})  

export const updateProduit = (nom, prix, description, photo, categorie_id) => ({
    type: "UPDATE-PRODUIT", 
    nom: nom, 
    prix: prix, 
    description: description, 
    photo: photo, 
    categorie_id: categorie_id
})

export const deleteProduits = (id ) => ({
    type: 'DELETE_PRODUIT',
    id: id
}); 

export const getCategorie = (id, categorieNom) => ({
    type: 'GET_CATEGORY', 
    id: id, 
    categorieNom: categorieNom
})