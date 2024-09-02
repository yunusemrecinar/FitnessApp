import { Alert, Button, Text, TextInput, View } from "react-native";

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
        <View style={{ padding: 20 }}>
            <Text>Email</Text>
            <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 20 }} />
            <Text>Passowrd</Text>
            <TextInput 
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, marginEnd: 20 }}
            />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
}

export default RegisterScreen;