import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import FlatButton from "../../components/ui/FlatButton";

function ForgotPasswordLandingScreen({ navigation }) {
    const [email, setEmail] = useState('');

    function handleSendEmail() {
        const randomCode = Math.floor(100000 + Math.random() * 900000);
        navigation.navigate("ForgotPasswordCode", { email: email, emailCode: randomCode.toString() });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Forget Password</Text>
            <Text style={styles.description}>Enter the email address associated with your account and we’ll send you a link to reset your password.</Text>
            <View style={styles.emailContainer}>
                <Text style={styles.emailLabel}>Email</Text>
                <TextInput 
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    selectionColor="#67F2D1"
                    style={styles.input}
                />
                <FlatButton onPress={handleSendEmail}>Send</FlatButton>
            </View>
            <View style={styles.dividerContainer}>
                <View style={styles.line} />
                <Text style={styles.text}>Or</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.switchRegisterWrapper}>
                <Text style={[styles.fontRegular, styles.switchText]}>Already have an account?</Text>
                <Pressable onPress={() => navigation.navigate('Login')} >
                    <Text style={[styles.switchText, styles.switchButton, styles.fontBold]}>Sign in</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default ForgotPasswordLandingScreen;

const styles = StyleSheet.create({
    fontBold: {
        fontFamily: 'baloo-bold'
    },
    fontRegular: {
        fontFamily: 'baloo-regular'
    },
    pressed: {
        opacity: 0.7,
    },
    container: {
        flex: 1,
        backgroundColor: '#141414',
        padding: 25,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        color: "#FCFCFC",
        fontFamily: 'baloo-bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        fontFamily: 'baloo-regular',
        marginBottom: 70,
        color: "#BBBBBB",
        textAlign: 'center',
        lineHeight: 22,
    },
    emailContainer: {
        marginBottom: 30,
    },
    emailLabel: {
        fontSize: 18,
        fontFamily: 'baloo-regular',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    input: {
        paddingHorizontal: 15,
        height: 50,
        borderRadius: 8,
        color: '#FFFFFF',
        marginBottom: 30,
        fontFamily: 'baloo-regular',
        fontSize: 16,
        backgroundColor: '#D4D4D433',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 75
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#D8D8D8',  // Light grey color for the line
    },
    text: {
        marginHorizontal: 17,
        color: '#B4B4B4',  // Light grey color for the text
        fontFamily: 'baloo-regular',
        fontSize: 18,
    },
    switchRegister: {
        marginBottom: 25
    },
    switchRegisterWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    switchButton: {
        paddingLeft: 4,
        color: '#67F2D1',
    },
    switchText: {
        fontSize: 16,
        color: '#FFFFFF',
    }
});