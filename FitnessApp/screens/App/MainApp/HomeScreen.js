import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../../../store/auth-context";

function HomeScreen({ route, navigation }) {
    const authCtx = useContext(AuthContext);

    console.log("Home" ,authCtx.allWorkoutPlan);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontFamily: 'baloo-bold',
    }
});