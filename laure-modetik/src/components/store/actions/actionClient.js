export const signIn = (token, name, email, id) => ({
    type: "SIGN-IN",
    token: token,
    name: name,
    email: email,
    id: id
})

export const signOut = () => ({
    type: "SIGN-OUT"
})