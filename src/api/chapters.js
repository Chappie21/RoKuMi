import axios from "axios";
import { constants } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definir base URL de llamadas a la API
axios.defaults.baseURL = constants.baseUrl;

const setToken = async () => {
    const token = JSON.parse(await AsyncStorage.getItem("USER")).access_token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
};


export const postNewChapter = async (formData, serie) => {
    try {
        await setToken();

        const headers = {
            Authorization: axios.defaults.headers.common['authorization'],
            'Content-Type': `multipart/form-data`,
        }

        const { data } = await axios.post(constants.postChapter(serie), formData, {
            headers: headers,
            transformRequest: (data, headers) => {
                return formData; // this is doing the trick
            },
        });

        return data;

    } catch (error) {
        console.log(error.response);
        return error.response.data;
    }
}

export const getChapter = async (chapter) => {
    try {
        const { data } = await axios.get(constants.getChapter(chapter));

        return data;
    } catch (error) {
        console.log(error.response);
    }
}

export const deleteChapter = async (chapter) => {
    try {
        await setToken();
        const { data } = await axios.delete(constants.getChapter(chapter));

        return data

    } catch (error) {
        console.log(error.response.data)
        return error.response.data;
    }
}