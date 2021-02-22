export const SignIn = (token, name, email, id) => ({
    type: "SIGN-INADMIN",
    token: token,
    name: name,
    email: email,
    id: id
})

export const signOut = () => ({
    type: "SIGN-OUTADMIN"
}) 

export const adminProducts = (admin_products) => ({
    type: "USER-PRODUCTS",
    admin_products: admin_products
})

export const deleteAdminProducts = (id) => ({
    type:"DELETE",
    id:id
})