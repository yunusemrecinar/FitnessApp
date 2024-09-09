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
        const data = response.data;

        // Saving token to the local storage for future requests
        await AsyncStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        throw error.response.data;
    }
};

// GOOGLE AUTH
export const googleLoginRegister = async (token, user) => {
    try {
        const response = await axios.post(`${API_URL}/googleLoginRegister`, {
            token: token,
            user: user
        });
        const data = response.data;

        return data;
    } catch (error) {
        throw error;
    }
}

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

// UPDATE PASSWORD
export const updatePassword = async (email, password) => {
    try {
        const response = await axios.post(
            `${API_URL}/updatePassword`,
            {
                email,
                password,
            }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// COMPLETE ONBOARDING
export const completeOnboarding = async (token, selectedDays, daysWithTargetArea, daysWithTargetExercises) => {
    try {
        const response = await axios.post(`${API_URL}/completeOnBoarding`, 
            {
                selectedDays: selectedDays,
                daysWithTargetArea: daysWithTargetArea,
                daysWithTargetExercises: daysWithTargetExercises
            },
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        const data = response.data;
        
        return data;
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

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};