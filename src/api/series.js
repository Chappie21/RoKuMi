import axios from "axios";
import { constants } from "./constants";

// Definir base URL de llamadas a la API
axios.defaults.baseURL = constants.baseUrl;

export const getUserSeries = async () => {
    try {
        const { data } = await axios.get('mySeries');

        return data;
    } catch (error) {
        console.log(error);
    }
}

// Obtener todas las series
export const getAllSeries = async () =>{
    try {
        const { data } = await axios.get(constants.getAllSeries);

        return data;
    } catch (error) {
        console.log(error);
    }
}