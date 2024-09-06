import { Image, StyleSheet, Text, View } from 'react-native';

function Logo({ style }) {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../../assets/images/gorilla.png')} />
            </View>
            <Text style={[styles.text, style]}>Stalwart</Text>
        </View>
    );
}

export default Logo;

const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 48,
        color: '#2D2E30',
        marginLeft: 8,
        fontFamily: 'baloo-bold',
        paddingTop: 10,
    },
    imageContainer: {
        width: 45,
        height: 45,
    },
    image: {
        height: '100%',
        width: '100%'
    }
})