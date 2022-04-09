import axios from "axios";
import { constants } from "./constants";

// Definir base URL de llamadas a la API
axios.defaults.baseURL = 'https://62519625dfa31c1fbd70187d.mockapi.io/test/rokumi/';

export const getUserSeries = async () => {
    try {
        const { data } = await axios.get('mySeries');

        return data;
    } catch (error) {
        console.log(error);
    }
} 