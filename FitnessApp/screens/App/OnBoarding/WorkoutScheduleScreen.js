import { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width: screenWidth } = Dimensions.get('window');
const stepWidth = screenWidth / 5 - 17;

function WorkoutScheduleScreen({ route, navigation }) {
    const { pickedDays, token } = route.params;
    const [selectedDays, setSelectedDays] = useState(pickedDays);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const toggleDay = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const handleNext = () => {
        const filteredDays = days.filter(day => selectedDays.includes(day));
        
        navigation.replace('TargetArea', { 
            selectedDays: filteredDays,
            currentDay: 0,
            prevDaysData: {
                [filteredDays[0]]: ['Chest', 'Legs'],
            },
            token: token
        });        
    }

    const handleBack = () => {
        navigation.replace('WorkoutPlan', {
            token: token
        });
    }

    const DayButtons = () => {
        return (
            <View style={styles.dayButtonContainer}>
                {days.map((day) => (
                    <TouchableOpacity
                        key={day}
                        style={[
                            styles.dayButton,
                            selectedDays.includes(day) && styles.selectedButton
                        ]}
                        onPress={() => toggleDay(day)}
                        >
                            <Text style={styles.dayButtonText}>{day}</Text>
                        </TouchableOpacity>
                ))}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.progressBarContainer}>
                <View style={styles.activeStep}></View>
                <View style={styles.activeStep}></View>
                <View style={styles.activeStep}></View>
                <View style={styles.inactiveStep}></View>
                <View style={styles.inactiveStep}></View>
            </View>
            <Text style={styles.workoutScheduleText}>Which days will you work?</Text>
            <DayButtons />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.backButton]}
                    onPress={handleBack}
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
} 

export default WorkoutScheduleScreen;

const styles = StyleSheet.create({
    /* Day Buttons Begin */
    dayButtonContainer: {
        flex: 1,
        gap: 20,
        backgroundColor: '#171717',
        marginTop: 40,
    },
    dayButton: {
        height: 50,
        backgroundColor: '#FFFFFF1A',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D4D4D433',
        borderRadius: 8
    },
    selectedButton: {
        borderColor: '#67F2D1'
    },
    dayButtonText: {
        color: 'white',
        fontFamily: 'roboto-condensed-semibold',
        fontSize: 20,
        lineHeight: 42,
    },
    /* Day Buttons End */
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
    workoutScheduleText: {
        fontFamily: 'roboto-condensed-semibold',
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 90,
    },
    buttonContainer: {
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