import axios from "axios";
import { constants } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definir base URL de llamadas a la API

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
export const getAllSeries = async () =>{
    try {
        const { data } = await axios.get(constants.getAllSeries);

        return data;
    } catch (error) {
        console.log(error);
    }
}