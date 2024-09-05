import { StyleSheet, Text, View } from "react-native";
import IconShare from "../components/ui/Icon";

function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            <IconShare color="red" width={16} height={16} />
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