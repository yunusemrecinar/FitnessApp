import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from './Logo';

const CustomSplashScreen = () => {
    return (
        <View style={styles.container}>
            <Logo />
        </View>
    );
};

export default CustomSplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#29D165',
    }
})
