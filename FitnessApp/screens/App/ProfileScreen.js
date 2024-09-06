import { useContext, useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { AuthContext } from "../../store/auth-context";
import { getUser, logout } from "../../util/http";

const ProfileScreen = ({ navigation }) => {
    const authCtx = useContext(AuthContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // setTimeout(async () => {
                    const userData = await getUser();
                    setUser(userData);
                // }, 500)
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
            authCtx.logout();
            navigation.replace('AuthStack');
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to log out');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            {user ? (
                <>
                    <Text>Welcome, {user.name || user.email}!</Text>
                    <Button title="Logout" onPress={handleLogout} />
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

export default ProfileScreen;