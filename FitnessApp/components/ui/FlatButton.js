import { Pressable, StyleSheet, Text, View } from "react-native";

function FlatButton({ children, onPress }) {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={onPress}
        >
            <View>
                <Text style={styles.buttonText} >{children}</Text>
            </View>
        </Pressable>
    )
}

export default FlatButton;

const styles = StyleSheet.create({
    button: {
        paddingVertical: 14,
        backgroundColor: '#67F2D1',
        borderRadius: 8,
        // iOS Shadow
        shadowColor: '#000',  // Shadow color
        shadowOffset: { width: 4, height: 4 },  // Shadow position offset
        shadowOpacity: 0.13,  // Shadow transparency
        shadowRadius: 4,  // How much to blur the shadow
        // Android Shadow
        elevation: 4,  // Shadow depth
    },
    pressed: {
        opacity: 0.7,
    },
    buttonText: {
        fontFamily: 'baloo-semiBold',
        color: '#222222',
        fontSize: 18,
        textAlign: 'center',
    },
});