import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000';

// REGISTER
export const register = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// LOGIN
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password
        });
        const token = response.data.token;

        // Saving token to the local storage for future requests
        await AsyncStorage.setItem('token', token);
        return token;
    } catch (error) {
        throw error.response.data;
    }
};

// LOGOUT
export const logout = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
        await axios.post(
            `${API_URL}/logout`,
            {},
            {
                headers: {
                    Authorization: token,
                },
            }
        );

        await AsyncStorage.removeItem('token');
    } catch (error) {
        throw error.response.data;
    }
};

// USER
export const getUser = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}/user`, {
            headers: {
                Authorization: token,
            },
        });
        const user = response.data;
        return user;
    } catch (error) {
        throw error.response.data;
    }
};

// USER INFORMATION (GOOGLE)
export const getUserProfile = async (token) => {
    if (!token) return;
    try {
        const response = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response.data);
    } catch (error) {
        throw error.response.data;
    }
};