import { Ionicons } from '@expo/vector-icons'; // Ensure you have this dependency installed
import * as AppleAuthentication from "expo-apple-authentication";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useContext, useEffect, useState } from "react";
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import FlatButton from '../../components/ui/FlatButton';
import Logo from "../../components/ui/Logo";
import { AuthContext } from '../../store/auth-context';
import { getUserProfile, login, register } from "../../util/http";

const androidClientId = '733094219236-3jtjnt0g94s48l58mlt252q6il7kph68.apps.googleusercontent.com';
const iosClientId = '733094219236-3ug4c0ue4glrh1gjap95qisa8mc74sn5.apps.googleusercontent.com';

WebBrowser.maybeCompleteAuthSession();

const RegisterScreen = ({ navigation }) => {
    const authCtx = useContext(AuthContext);
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
            const user = getUserProfile(token);
        }
    }

    const handleSignInApple = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
        } catch (error) {
            if (error.code === "ERR_REQUEST_CANCELED") {
                Alert.alert('Error', error.code || 'Something went wrong');
            } else {
            }
        }
    }

    useEffect(() => {
        handleToken();
    }, [response]);

    const handleRegister = async () => {
        try {
            await register(email, password);
            const response = await login(email, password);
            Alert.alert('Success', 'Signed in successfully');
            const token = response.token;
            authCtx.authenticate(token);
            navigation.replace('OnBoarding', {
                screen: 'Welcome',
                params: {
                    token: response.token,
                },
            });
        } catch (error) {
            Alert.alert('Error', error.message || 'Something went wrong');
        }
    };

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>
                <Logo style={{ color: '#E3E3E3' }} />
                <View style={styles.inputForm}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        autoCapitalize="none"
                        selectionColor="#67F2D1"
                    />
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[styles.input, { flex: 1, paddingRight: 40 }]}
                            secureTextEntry={!showPassword}
                            onChangeText={text => setPassword(text)}
                            value={password}
                            selectionColor="#67F2D1"
                        />
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons
                                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatButton onPress={handleRegister}>Sign Up</FlatButton>
                <View style={styles.dividerContainer}>
                    <View style={styles.line} />
                    <Text style={styles.text}>Or</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.authIcons}>
                    <Pressable onPress={() => promptAsync()} style={({ pressed }) => [pressed && styles.pressed]}>
                        <View style={styles.googleBar}>
                            <View style={styles.googleIcon}>
                                <Image style={styles.image} source={require('../../assets/images/google-logo.png')} />
                            </View>
                            <Text style={styles.authText} >Continue with Google</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => handleSignInApple()} style={({ pressed }) => [pressed && styles.pressed]}>
                        <View style={styles.appleBar}>
                            <View style={styles.appleIcon}>
                                <Image style={styles.image} source={require('../../assets/images/apple-logo.png')} />
                            </View>
                            <Text style={styles.authText} >Continue with Apple</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.privacyPolicy}>
                    <Text style={styles.privacyPolicyText}>By creating an account, I agree to Stalwart's <Text style={{ textDecorationLine: 'underline', color: '#67F2D1' }}>Terms of Service</Text> & <Text style={{ textDecorationLine: 'underline', color: '#67F2D1' }}>Privacy Policy.</Text></Text>
                </View>
            </View>
            <View style={styles.switchRegister}>
                <View style={styles.switchRegisterWrapper}>
                    <Text style={[styles.fontRegular, styles.switchText]}>Already have an account?</Text>
                    <Pressable onPress={() => navigation.replace('Login')} >
                        <Text style={[styles.switchText, styles.switchButton, styles.fontBold]}>Sign in</Text>
                    </Pressable>
                </View>
            </View>


        </SafeAreaView>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#171717',
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
        marginBottom: 30
    },
    label: {
        fontFamily: 'baloo-regular',
        color: '#FFFFFF',
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
        borderRadius: 8,
        backgroundColor: '#D4D4D433',
        color: '#FFFFFF',
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
        marginTop: 30,
        gap: 10
    },
    googleBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D4D4D433',
        padding: 15,
        borderRadius: 8,
        // Shadow properties for iOS
        shadowColor: '#0000000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 10,
    },
    appleBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D4D4D433',
        padding: 15,
        borderRadius: 8,
        // Shadow properties for iOS
        shadowColor: '#0000000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 10,
    },
    googleIcon: {
        width: 25,
        height: 25
    },
    appleIcon: {
        width: 30,
        height: 30
    },
    image: {
        height: '100%',
        width: '100%'
    },
    authText: {
        fontFamily: 'baloo-regular',
        color: '#FFFFFF',
        fontSize: 18,
        marginLeft: 21,
    },
    privacyPolicy: {
        marginTop: 20,
        fontFamily: 'baloo-regular'
    },
    privacyPolicyText: {
        color: '#B4B4B4',
        fontFamily: 'baloo-regular',
        fontSize: 14,
        lineHeight: 22,
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
        color: '#67F2D1'
    }, 
    switchText: {
        color: "#FFFFFF",
        fontSize: 16
    }
});