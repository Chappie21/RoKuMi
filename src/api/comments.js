import axios from "axios";
import { constants } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definir base URL de llamadas a la API
axios.defaults.baseURL = constants.baseUrl;

const setToken = async () => {
    const token = JSON.parse(await AsyncStorage.getItem("USER")).access_token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
};


export const getCommentsOfChapter = async (chapter) => {
    try {
        const { data } = await axios.get(constants.getCommentsOfChapter(chapter));

        return data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}