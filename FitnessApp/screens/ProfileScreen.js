import { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { getUser, logout } from "../util/http";

const ProfileScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUser();
                setUser(userData);
            } catch (error) {
                Alert.alert('Error', error.message || 'Failed to load user data');
            }
        };
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            Alert.alert('Success', 'Logged out successfully');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to log out');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            {user ? (
                <>
                    <Text>Welcome, {user.email}!</Text>
                    <Button title="Logout" onPress={handleLogout} />
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

export default ProfileScreen;