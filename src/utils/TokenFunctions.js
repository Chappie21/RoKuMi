import jwtDecode from "jwt-decode";

export const checkIfTokenExpired = (token) => {
  if (jwtDecode(token).exp < Date.now() / 1000) {
    return true
  } else {
    return false
  }
}