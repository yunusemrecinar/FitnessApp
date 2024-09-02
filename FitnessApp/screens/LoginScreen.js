import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { login } from "../util/http";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await login(email, password);
            Alert.alert('Success', 'Logged in successfully');
            navigation.navigate('Profile');
        } catch (error) {
            Alert.alert('Error', error.message || 'Something went wrong');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Email</Text>
            <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 20 }} />
            <Text>Password</Text>
            <TextInput 
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, marginBottom: 20 }}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </View>
    );
}

export default LoginScreen;