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