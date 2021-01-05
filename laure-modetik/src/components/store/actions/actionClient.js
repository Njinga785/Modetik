export const signIn = (token, firstName, email, id) => ({
    type: "SIGN-INCLIENT",
    token: token,
    firstName: firstName,
    email: email,
    id: id
})

export const signOut = () => ({
    type: "SIGN-OUTCLIENT"
})