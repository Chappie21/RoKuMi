const SET_USER = "SET_USER"

// Establecer datos de usuario en el storage de redux
export const setUser = (user) =>({ type: SET_USER, user: user})