import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from './Logo';

const CustomSplashScreen = () => {
    return (
        <View style={styles.container}>
            <Logo style={{ color: '#2D2E30'}} />
        </View>
    );
};

export default CustomSplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#67F2D1',
    }
})
