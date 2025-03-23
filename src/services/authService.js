import axios from "axios";

const API_URL = "http://localhost:4000/api/auth/";

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Server error" };
    }
};


export const loginUser = async (email, password) => {
    return await axios.post(`${API_URL}/login`, { email, password });
};

