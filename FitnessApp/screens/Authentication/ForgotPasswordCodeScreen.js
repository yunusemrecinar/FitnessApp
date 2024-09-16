import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FlatButton from "../../components/ui/FlatButton";
import SixDigitInput from "../../components/ui/SixDigitInput";

function ForgotPasswordCodeScreen({ route, navigation }) {
    const { email, emailCode } = route.params;

    const [code, setCode] = useState('');

    function handleVerify() {
        if (code === emailCode.toString()) {
            navigation.replace('ForgotPasswordReset', { email });
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Check Your Email</Text>
            <Text style={styles.description}>Please check the email address and enter the code we have sent to reset your password.</Text>
            <SixDigitInput code={code} setCode={setCode} />
            <FlatButton onPress={handleVerify}>Verify</FlatButton>
        </View>
    );
}

export default ForgotPasswordCodeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171717',
        padding: 25,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        fontFamily: 'baloo-bold',
        marginBottom: 24,
        color: '#FCFCFC',
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        fontFamily: 'baloo-regular',
        marginBottom: 95,
        textAlign: 'center',
        color: '#BBBBBB',
        lineHeight: 22,
    },
});