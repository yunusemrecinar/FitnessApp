import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useState } from 'react';

export const AuthContext = createContext({
    token: '',
    allWorkoutPlan: '',
    isAuthenticated: false,
    authenticate: () => {},
    setAllPlan: () => {},
    fetchWorkoutPlan: () => {},
    logout: () => {},
})

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();
    const [allWorkoutPlan, setAllWorkoutPlan] = useState();

    function authenticate(token) {
        setAuthToken(token);
        AsyncStorage.setItem('token', token);
    }

    function logout() {
        setAuthToken(null);
        AsyncStorage.removeItem('token');
    }

    function setAllPlan(allPlan) {
        setAllWorkoutPlan(allPlan);
        AsyncStorage.setItem('AllWorkoutPlan', allPlan);
    }

    function fetchWorkoutPlan() {
        if (!allWorkoutPlan) {
            AsyncStorage.getItem('AllWorkoutPlan').then((plan) => {
                setAllWorkoutPlan(plan);
            });
        }
    }

    const value = {
        token: authToken,
        allWorkoutPlan: allWorkoutPlan,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        setAllPlan: setAllPlan,
        fetchWorkoutPlan: fetchWorkoutPlan,
        logout: logout
    };

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}

export default AuthContextProvider;