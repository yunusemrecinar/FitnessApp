import { StyleSheet, Text, View } from "react-native";
import Calendar from "../../../components/ui/Calendar";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 100 }}>Home Screen</Text>
            <Calendar />
            <View style={styles.todaysWorkout}>

            </View>
        </View>
    );
};
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171717',
        padding: 17,
    },
});