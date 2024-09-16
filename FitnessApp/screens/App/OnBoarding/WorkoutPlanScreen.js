import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import loops from '../../../assets/icons/loops';
import weekly from '../../../assets/icons/weekly';
import IconShare from '../../../components/ui/Icon';

const { width: screenWidth } = Dimensions.get('window');
const stepWidth = screenWidth / 5 - 17;

const WorkoutCard = ({ title, description, icon, isSelected, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.card, isSelected && styles.selectedCard]}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <IconShare width={24} height={24} xmlData={icon} />
            </View>
            <Text style={styles.description}>{description}</Text>
        </TouchableOpacity>
    );
};

const WorkoutPlanScreen = ({ route, navigation }) => {
    const { token } = route.params;
    const [selectedCard, setSelectedCard] = useState('Weekly');

    const handleNext = () => {
        if (selectedCard === 'Weekly') {
            navigation.replace('WorkoutSchedule', {
                pickedDays: ['Tuesday', 'Friday'],
                token: token
            });
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.progressBarContainer}>
                <View style={styles.activeStep}></View>
                <View style={styles.activeStep}></View>
                <View style={styles.inactiveStep}></View>
                <View style={styles.inactiveStep}></View>
                <View style={styles.inactiveStep}></View>
            </View>
            <Text style={styles.chooseWorkoutText}>Choose your workout plan</Text>
            <View style={styles.planContainer}>
                <WorkoutCard
                    title="Weekly"
                    description="Allows users to schedule workouts based on specific days of the week, following a regular weekly routine."
                    icon={weekly}
                    isSelected={selectedCard === 'Weekly'}
                    onPress={() => setSelectedCard('Weekly')}
                />
                <WorkoutCard
                    title="Loops"
                    description="Workouts are scheduled in cycles, such as 3 days on, 1 day off, repeating in a loop for flexibility and variation."
                    icon={loops}
                    isSelected={selectedCard === 'Loops'}
                    onPress={() => setSelectedCard('Loops')}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, styles.backButton]}
                    onPress={() => navigation.replace('Welcome')}    
                    >
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, styles.nextButton]}
                    onPress={handleNext}    
                >
                    <Text style={styles.nextText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    selectedCard: {
        borderWidth: 2,
        borderColor: '#67F2D1'
    },
    container: {
        flex: 1,
        backgroundColor: '#171717', // black background
        padding: 27,
        paddingTop: 100,
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
    chooseWorkoutText: {
        fontFamily: 'roboto-condensed-semibold',
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 90,
    },
    planContainer: {
        marginTop: 80,
        rowGap: 31,
    },
    card: {
        backgroundColor: '#FFFFFF1A',
        padding: 20,
        borderWidth: 2,
        borderColor: '#515151',
        borderRadius: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        gap: 9,
        marginBottom: 10,
        marginBottom: 26,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 22,
        lineHeight: 23,
        fontFamily: 'roboto-flex',
    },
    description: {
        color: '#CBCBCB',
        fontSize: 16,
        lineHeight: 22,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: 55,
    },
    button: {
        height: 50, 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    backButton: {
        backgroundColor: '#FFFFFF1A',
        width: screenWidth * 0.265, 
        borderWidth: 1,
        borderColor: '#515151',
    },
    nextButton: {
        backgroundColor: '#67F2D1', 
        width: screenWidth * 0.575,
    },
    backText: {
        fontFamily: 'roboto-bold',
        color: '#FCFCFC',
        fontSize: 18,
        lineHeight: 22,
    },
    nextText: {
        fontFamily: 'roboto-medium',
        color: '#222222', 
        fontSize: 18,
        lineHeight: 22,
    },
});

export default WorkoutPlanScreen;
