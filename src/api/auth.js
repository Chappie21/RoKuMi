import axios from "axios";
import { constants } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definir base URL de llamadas a la API
axios.defaults.baseURL = constants.baseUrl;

const setToken = async () => {
    const token = JSON.parse(await AsyncStorage.getItem("USER")).access_token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
};

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

export const logOut = async () => {
    try {
        await setToken();
        const { data } = await axios.delete(constants.logOut)

        return data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}