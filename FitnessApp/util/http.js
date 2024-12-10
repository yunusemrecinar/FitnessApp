import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = 'http://localhost:3000/api/';
// const API_URL = 'https://fitnessapp.emrecinar.xyz/api/';

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
export const completeOnboarding = async (token, selectedDays, daysWithTargetArea, daysWithTargetExercises, daysCompleted, daysWithNotes) => {
    try {
        const response = await axios.post(`${API_URL}/completeOnBoarding`, 
            {
                selectedDays: selectedDays,
                daysWithTargetArea: daysWithTargetArea,
                daysWithTargetExercises: daysWithTargetExercises,
                daysWithNotes: daysWithNotes,
                daysCompleted: daysCompleted
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
        throw error;
    }
};

// ADD NEW WORKOUT
export const addNewWorkout = async (token, workout) => {
    try {
        const response = await axios.post(`${API_URL}/addNewWorkout`, 
            {
                workout: workout
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
        throw error;
    }
}

export const completeWorkout = async (token, day, completedExercises) => {
    try {
        const response = await axios.post(`${API_URL}/completeWorkout`, 
            {
                day: day,
                completedExercises: completedExercises
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
        throw error;
    }
}

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
        throw error;
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
        throw error;
    }
};