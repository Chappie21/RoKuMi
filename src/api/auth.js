import axios from "axios";
import { constants } from "./constants";

// Definir base URL de llamadas a la API
axios.defaults.baseURL = constants.baseUrl;

// AUTNETICACION
export const postLogin = async (email, password) => {
    try {

        const body = {
            email: email,
            password: password
        };

        const { data } = await axios.post(constants.postLogin, body);

        return data;

    } catch (error) {
        return error.response.data;
    }
}

// REGISTRO
export const postRegister = async (firstName, lastName, email, password) => {
    try {

        const body = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }

        const { data } = await axios.post(constants.postRegister, body);

        return data;
        
    } catch (error) {
        return error.response.data;
    }
}
