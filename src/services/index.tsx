import axios from 'axios';
import { config } from '@/config';

const API_URL = `${config.apiUrl}`;

export const getResult = async (filename: string) => {
    try {
        const options = {
            headers: {
                accept: "application/json",
                // Authorization: `Bearer ${jwt}`,
            },
        };
        const response = await axios.get(`${API_URL}/result/${filename}`, options)
        // console.log('Response:', response.data);
        return response.data;
    } catch (error: unknown) {
        console.error('Error retrieving result:', error || error);
        return []
    }
}


export const predict = async (file: File) => {
    try {
        // console.log("API URL:", `${API_URL}/predict`);

        const formData = new FormData();
        formData.append("file", file);

        const options = {
            headers: {
                accept: "application/json",
                "Content-Type": "multipart/form-data",
                // Authorization: `Bearer ${jwt}`,
            },
        };
        const response = await axios.post(`${API_URL}/predict`, formData, options)
        // console.log('Response:', response.data);
        return response.data;
    } catch (error: unknown) {
        console.error('Error predicting:', error || error);
        return []
    }
}
