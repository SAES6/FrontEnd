import axios from "axios";
import {toast} from "react-toastify";

export const callApiGet = async ({url, authorization = {}, errorMessage = ''}) => {
    try {
        return await axios.create({baseURL: process.env.REACT_APP_API_URL,}).get(url, authorization);
    } catch (error) {
        toast.error(errorMessage, {
            position: "top-center",
            style: {
                fontFamily: "Poppins, sans-serif",
                borderRadius: "15px",
                textAlign: "center",
            },
        });
        throw error.response;
    }
};

export const callApiPost = async ({url, data, authorization, errorMessage}) => {
    try {
        return await axios.create({baseURL: process.env.REACT_APP_API_URL,}).post(url, data, authorization);
    } catch (error) {
        toast.error(errorMessage, {
            position: "top-center",
            style: {
                fontFamily: "Poppins, sans-serif",
                borderRadius: "15px",
                textAlign: "center",
            },
        });
        throw error.response;
    }
};

export const callApiDelete = async ({url, authorization, errorMessage}) => {
    try {
        return await axios.create({baseURL: process.env.REACT_APP_API_URL,}).delete(url, authorization);
    } catch (error) {
        toast.error(errorMessage, {
            position: "top-center",
            style: {
                fontFamily: "Poppins, sans-serif",
                borderRadius: "15px",
                textAlign: "center",
            },
        });
        throw error.response;
    }
};

export const callApiPut = async ({url, data, authorization, errorMessage}) => {
    try {
        return await axios.create({baseURL: process.env.REACT_APP_API_URL,}).put(url, data, authorization);
    } catch (error) {
        toast.error(errorMessage, {
            position: "top-center",
            style: {
                fontFamily: "Poppins, sans-serif",
                borderRadius: "15px",
                textAlign: "center",
            },
        });
        throw error.response;
    }
};

