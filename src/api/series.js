import axios from "axios";
import { constants } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definir base URL de llamadas a la API
axios.defaults.baseURL = constants.baseUrl;

const setToken = async () => {
    const token = JSON.parse(await AsyncStorage.getItem("USER")).access_token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
};


export const getUserSeries = async () => {
    try {
        await setToken();
        const { data } = await axios.get(constants.getUserSeries);

        return data.tracking;
    } catch (error) {
        console.log(error);
    }
}

// Obtener todas las series
export const getAllSeries = async () => {
    try {
        const { data } = await axios.get(constants.seriesEP);

        return data;
    } catch (error) {
        console.log(error);
    }
}

// Crear o añadir una Serie
export const postUploadSerie = async (formData) => {
    try {
        await setToken();

        const headers = {
            Authorization: axios.defaults.headers.common['authorization'],
            'Content-Type': 'multipart/form-data',
        }

        const { data } = await axios({method: 'POST', url: constants.seriesEP, data: formData, headers: headers});

        return data;
    } catch (error) {
        console.log(error.response.data);
    }
}