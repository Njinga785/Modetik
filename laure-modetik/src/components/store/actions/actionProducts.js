
export const getListProducts = (products) => ({ 
    
    type: "LIST-PRODUCTS",
    products: products
})

export const addProduct = (product) => ({
    type: "ADD-PRODUCT",
    product: product
})   

export const deleteProcducts = (id ) => ({
    type: 'DELETE_PRODUCT',
    id: id
});