import { StyleSheet, Text, View } from "react-native";

function HomeScreen({ route, navigation }) {
    const { selectedDays, daysWithTargetArea, daysWithTargetExercises } = route.params;

    console.log(selectedDays, daysWithTargetArea, daysWithTargetExercises);
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