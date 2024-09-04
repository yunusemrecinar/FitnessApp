import { useState } from "react";
import { Alert, Button, SafeAreaView, Text, TextInput } from "react-native";
import { register } from "../util/http";

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await register(email, password);
            Alert.alert('Successs', 'Registered successfully');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', error.message || 'Something went wrong');
        }
    };

    return (
        <SafeAreaView>
            <Text>Email</Text>
            <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 20 }} />
            <Text>Passowrd</Text>
            <TextInput 
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, marginBottom: 20 }}
            />
            <Button title="Register" onPress={handleRegister} />
        </SafeAreaView>
    );
}

export default RegisterScreen;