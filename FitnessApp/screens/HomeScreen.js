// import { StyleSheet, Text, View } from "react-native";
// import IconShare from "../components/ui/Icon";

// function HomeScreen() {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Home Screen</Text>
//             <IconShare color="red" width={16} height={16} />
//         </View>
//     );
// }

// export default HomeScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 24,
//         fontFamily: 'baloo-bold',
//     }
// });
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient'; // Use Expo's built-in LinearGradient
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const GradientText = () => {
    return (
        <View style={styles.container}>
            <MaskedView
                maskElement={
                    <Text style={[styles.text, { backgroundColor: 'transparent' }]}>
                        aâaaaaâaaaaâaaaaâaaaaâaaaaâaaa
                    </Text>
                }
            >
                <LinearGradient
                    colors={['#67F2D1', '#FFFFFF']}
                    start={{ x: -1, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                />
            </MaskedView>
        </View>
    );
};

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <GradientText />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    gradient: {
        width: 300,  // You can adjust the width and height to fit the text
        height: 100, // This ensures the gradient has a size
    },
});

export default HomeScreen;
