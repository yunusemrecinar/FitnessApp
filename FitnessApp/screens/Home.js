import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { exampleHttp } from "../util/http";

function Home() {
    const [state1, setState1] = useState('');

    async function getDeneme() {
        try {
            const example = await exampleHttp();
            setState1(example.data);
        } catch (error) {
        }
    }

    getDeneme();

    return (
        <View style={styles.rootContainer}>
            <Text style={styles.message}>fsdjkfjk{state1}</Text>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    rootContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 150
    },
    message: {
        fontSize: 16,
    },
});