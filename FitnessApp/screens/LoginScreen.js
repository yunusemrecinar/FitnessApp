import { Ionicons } from '@expo/vector-icons'; // Ensure you have this dependency installed
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import FlatButton from '../components/ui/FlatButton';
import Logo from "../components/ui/Logo";
import { login } from "../util/http";

const androidClientId = '733094219236-3jtjnt0g94s48l58mlt252q6il7kph68.apps.googleusercontent.com';
const iosClientId = '733094219236-3ug4c0ue4glrh1gjap95qisa8mc74sn5.apps.googleusercontent.com';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
    const config = {
        androidClientId,
        iosClientId
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [request, response, promptAsync] = Google.useAuthRequest(config);
   
    const handleToken = () => {
        if (response?.type === "success") {
            const { authentication } = response;
            const token = authentication?.accessToken;
            console.log("access token", token);
        }
    }

    useEffect(() => {
        handleToken();
    }, [response]);

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
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>
                <Logo />
                <View style={styles.inputForm}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput 
                        value={email} 
                        onChangeText={setEmail} 
                        style={styles.input}
                        autoCapitalize="none"
                        selectionColor="#29D165"
                    />
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[styles.input, { flex: 1, paddingRight: 40 }]}
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            onChangeText={text => setPassword(text)}
                            value={password}
                            selectionColor="#29D165"
                        />
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons
                                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                size={24}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <Button style={styles.signIn} title="Sign in" onPress={handleLogin} /> */}
                <FlatButton>Sign in</FlatButton>
                {/* <Button title="Register" onPress={() => navigation.navigate('Register')} /> */}
                <View style={styles.dividerContainer}>
                    <View style={styles.line} />
                    <Text style={styles.text}>Or sign in with</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.authIcons}>
                    <Pressable onPress={() => promptAsync()} style={({ pressed }) => [pressed && styles.pressed]}>
                        <View style={styles.googleCircle}>
                            <View style={styles.googleIcon}>
                                <Image style={styles.image} source={require('../assets/images/google-logo.png')} />
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={({ pressed }) => [pressed && styles.pressed]}>
                        <View style={styles.appleCircle}>
                            <View style={styles.appleIcon}>
                                <Image style={styles.image} source={require('../assets/images/apple-logo.png')} />
                            </View>
                        </View>
                    </Pressable>
                </View>
            </View>
            <View style={styles.switchRegister}>
                <View style={styles.switchRegisterWrapper}>
                    <Text style={styles.fontRegular}>Don't have an account?</Text>
                    <Pressable >
                        <Text style={[styles.switchButton, styles.fontBold]}>Sign Up</Text>
                    </Pressable>
                    {/* <Button style={styles.fontBold} title='Sign Up' /> */}
                </View>
            </View>
            

        </SafeAreaView>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#FEFEFE',
    },
    fontBold: {
        fontFamily: 'baloo-bold'
    },
    fontSemiBold: {
        fontFamily: 'baloo-semiBold'
    },
    fontRegular: {
        fontFamily: 'baloo-regular'
    },
    pressed: {
        opacity: 0.7,
    },
    container: {
        padding: 25,
        paddingTop: 40
    },
    inputForm: {
        marginTop: 50,
        marginBottom: 40
    },
    label: {
        fontFamily: 'baloo-regular',
        fontSize: 16
    },
    input: {
        height: 50,
        marginBottom: 10,
        padding: 4,
        paddingTop: 7,
        paddingLeft: 10,
        fontFamily: 'baloo-regular',
        fontSize: 16,
        borderWidth: 1, 
        borderRadius: 8,
        borderColor: '#D4D4D4'
    },
    passwordContainer: {
        flexDirection: 'row',
        position: 'relative'
    },
    icon: {
        padding: 15,
        paddingRight: 0,
        position: 'absolute',
        right: 15
    },
    signIn: {
        backgroundColor: '#29D165',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#D8D8D8',  // Light grey color for the line
    },
    text: {
        marginHorizontal: 10,
        color: '#B4B4B4',  // Light grey color for the text
        fontFamily: 'baloo-regular',
        fontSize: 18,
    },
    authIcons: {
        marginTop: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 30
    },
    googleCircle: {
        backgroundColor: '#FEFEFE',
        padding: 18,
        borderRadius: '100%',
        // Shadow properties for iOS
        shadowColor: '#0000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 10,
    },
    appleCircle: {
        backgroundColor: '#FEFEFE',
        padding: 18,
        borderRadius: '100%',
        paddingTop: 16,
        // Shadow properties for iOS
        shadowColor: '#0000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 10,
    },
    googleIcon: {
        width: 30,
        height: 30
    },
    appleIcon: {
        width: 30,
        height: 30
    },
    image: {
        height: '100%',
        width: '100%'
    },
    switchRegister: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 25
    },
    switchRegisterWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    switchButton: {
        paddingLeft: 4,
        color: '#29D165'
    }
});