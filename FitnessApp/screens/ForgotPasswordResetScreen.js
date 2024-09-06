import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import FlatButton from "../components/ui/FlatButton";
import { updatePassword } from '../util/http';

function ForgotPasswordResetScreen({ route, navigation }) {
    const { email } = route.params;
    const [passwordFirst, setPasswordFirst] = useState('');
    const [showPasswordFirst, setShowPasswordFirst] = useState(false);
    const [passwordSecond, setPasswordSecond] = useState('');
    const [showPasswordSecond, setShowPasswordSecond] = useState(false);

    const handleUpdate = async () => {
        if (passwordFirst !== passwordSecond) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            // Call the reset password API
            await updatePassword(email, passwordFirst);
            Alert.alert('Success', 'Password updated successfully');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to reset password');
            return;
        }

       
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Reset Password</Text>
            <Text style={styles.description}>Set your new password.</Text>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={[styles.input, { flex: 1, paddingRight: 40 }]}
                    secureTextEntry={!showPasswordFirst}
                    onChangeText={text => setPasswordFirst(text)}
                    value={passwordFirst}
                    selectionColor="#29D165"
                />
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setShowPasswordFirst(!showPasswordFirst)}
                >
                    <Ionicons
                        name={showPasswordFirst ? 'eye-outline' : 'eye-off-outline'}
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={[styles.passwordContainer, { marginBottom: 30 }]}>
                <TextInput
                    style={[styles.input, { flex: 1, paddingRight: 40 }]}
                    secureTextEntry={!showPasswordSecond}
                    onChangeText={text => setPasswordSecond(text)}
                    value={passwordSecond}
                    selectionColor="#29D165"
                />
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setShowPasswordSecond(!showPasswordSecond)}
                >
                    <Ionicons
                        name={showPasswordSecond ? 'eye-outline' : 'eye-off-outline'}
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
            <FlatButton onPress={handleUpdate}>Update</FlatButton>
        </View>
    )
}

export default ForgotPasswordResetScreen;

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
    label: {
        fontFamily: 'baloo-regular',
        fontSize: 16,
        color: '#FFFFFF'
    },
    passwordContainer: {
        flexDirection: 'row',
        position: 'relative',
    },
    input: {
        height: 50,
        marginBottom: 10,
        padding: 4,
        paddingTop: 7,
        paddingLeft: 10,
        fontFamily: 'baloo-regular',
        backgroundColor: '#D4D4D433',
        fontSize: 16,
        borderRadius: 8,
    },
    icon: {
        padding: 15,
        paddingRight: 0,
        position: 'absolute',
        right: 15
    },
});