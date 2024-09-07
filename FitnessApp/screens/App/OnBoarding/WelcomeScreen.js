import AntDesign from '@expo/vector-icons/AntDesign';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const stepWidth = screenWidth / 5 - 17;

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.placeholder}>
                <View style={styles.progressBarContainer}>
                    <View style={styles.activeStep}></View>
                    <View style={styles.inactiveStep}></View>
                    <View style={styles.inactiveStep}></View>
                    <View style={styles.inactiveStep}></View>
                    <View style={styles.inactiveStep}></View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <MaskedView
                    maskElement={
                        <Text style={[styles.text, { backgroundColor: 'transparent' }]}>
                            Start to <Text style={{ fontFamily: 'caladea-bold' }}>personalize</Text> your workout plans
                        </Text>
                    }
                >
                    <LinearGradient
                        colors={['#67F2D1', '#FFFFFF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradient}
                    />
                </MaskedView>
                <TouchableOpacity 
                    style={styles.startButton} 
                    onPress={() => navigation.replace('WorkoutPlan')}
                >
                    <Text style={styles.buttonText}>Start</Text>
                    <AntDesign name="arrowright" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    gradient: {
        // width: 300,  // You can adjust the width and height to fit the text
        height: 85, // This ensures the gradient has a size
    },
    container: {
        flex: 1,
        backgroundColor: '#171717', // black background
    },
    placeholder: {
        backgroundColor: '#242424', // placeholder background color
        paddingHorizontal: 27,
        paddingTop: 100,
        height: '62%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    progressBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    activeStep: {
        backgroundColor: '#67F2D1', // active step color
        width: stepWidth,
        height: 4,
        borderRadius: 10
    },
    inactiveStep: {
        backgroundColor: '#FFFFFF', // inactive step color
        width: stepWidth,
        height: 4,
        borderRadius: 10
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 55,
        padding: 27,
        rowGap: 57,
    },
    text: {
        fontSize: 38,
        lineHeight: 42,
        fontWeight: 'bold',
        fontFamily: 'roboto-condensed-semibold',
    },
    startButton: {
        flexDirection: 'row',
        backgroundColor: '#67F2D1', // button background color
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        height: 50,
    },
    buttonText: {
        color: '#222222', // black text on button
        fontSize: 18,
        alignItems: 'center',
        fontFamily: 'roboto-condensed-semibold',
    },
});

export default WelcomeScreen;
