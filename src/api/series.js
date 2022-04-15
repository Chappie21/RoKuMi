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

        return data.series;
    } catch (error) {
        console.log(error);
    }
}

export const getUserTackingList = async () => {
    try {
        await setToken();
        const { data } = await axios.get(constants.getUserSeries);

        return data;
    } catch (error) {
        console.log(error);
        return error.response;
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
            'Content-Type': `multipart/form-data`,
        }

        const { data } = await axios.post(constants.seriesEP, formData, {
            headers: headers,
            transformRequest: (data, headers) => {
                return formData; // this is doing the trick
            },
        });

        return data;
    } catch (error) {
        console.log(error.response.data);
        return error.response.data;
    }
}

// Obtener Capitulos de una serie
export const getSerieData = async (serie) => {
    try {
        const { data } = await axios.get(constants.getChapterstBySerie(serie));

        return data;
    } catch (error) {
        console.log(error.response.data);
    }
}

export const putSerieById = async (formData, serie) => {
    try {
        await setToken();

        const headers = {
            Authorization: axios.defaults.headers.common['authorization'],
            'Content-Type': `multipart/form-data`,
        }

        const { data } = await axios.put(constants.getChapterstBySerie(serie), formData, {
            headers: headers,
            transformRequest: (data, headers) => {
                return formData; // this is doing the trick
            },
        });

        return data;
    } catch (error) {
        console.log(error.response.data);
        return error.response.data;
    }
}