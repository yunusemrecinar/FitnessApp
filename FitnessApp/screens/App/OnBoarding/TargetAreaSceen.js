import { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width: screenWidth } = Dimensions.get('window');
const stepWidth = screenWidth / 5 - 17;

function TargetAreaScreen({ route, navigation }) {
    const { selectedDays, currentDay, prevDaysData } = route.params;
    const [selectedArea, setSelectedArea] = useState(prevDaysData[selectedDays[currentDay]] || ['Chest', 'Legs']);
    const stepPercentage = ((currentDay + 1) / selectedDays.length) * 100;

    const areas = ['Arms', 'Chest', 'Belly', 'Buff', 'ABC', 'Legs'];

    const toggleArea = (area) => {
        if (selectedArea.includes(area)) {
            setSelectedArea(selectedArea.filter(selectedArea => selectedArea !== area));
        } else {
            setSelectedArea([...selectedArea, area]);
        }
    };

    const handleBack = () => {
        if (currentDay === 0) {
            navigation.replace('WorkoutSchedule', { pickedDays: selectedDays });
            return;
        }

        navigation.replace('TargetArea', {
            selectedDays: selectedDays,
            currentDay: currentDay - 1,
            prevDaysData: prevDaysData
        });
    }

    const handleNext = () => {
        if (currentDay === selectedDays.length - 1) {
            navigation.replace('TargetExercises', {
                selectedDays: selectedDays,
                currentDay: 0,
                daysWithTargetArea: {
                    ...prevDaysData,
                    [selectedDays[currentDay]]: selectedArea,
                },
                daysWithTargetExercises: {
                    [selectedDays[0]]: [
                        { exercise: 'bench_press', sets: '3 Sets', reps: '20' },
                        { exercise: 'bench_press', sets: '3 Sets', reps: '20' },
                        { exercise: 'bench_press', sets: '3 Sets', reps: '20' },
                    ],
                }
            });
            return;
        }
        
        navigation.replace('TargetArea', {
            selectedDays: selectedDays,
            currentDay: currentDay + 1,
            prevDaysData: {
                ...prevDaysData,
                [selectedDays[currentDay]]: selectedArea,
            }
        });      
    }

    const AreaButtons = () => {
        return (
            <View style={styles.areaButtonContainer}>
                {areas.map((area) => (
                    <TouchableOpacity
                        key={area}
                        style={[
                            styles.areaButton,
                            selectedArea.includes(area) && styles.selectedButton
                        ]}
                        onPress={() => toggleArea(area)}
                    >
                        <Text style={styles.areaButtonText}>{area}</Text>
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
                <View style={styles.inactiveStep}>
                    <View style={[styles.activeStepPercentage, { width: stepPercentage + '%' }]}></View>
                </View>
                <View style={styles.inactiveStep}></View>
            </View>
            <Text style={styles.workoutAreaText}>Which area will you work on <Text style={styles.selectedDay}>{selectedDays[currentDay]}?</Text></Text>
            <AreaButtons />
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

export default TargetAreaScreen;

const styles = StyleSheet.create({
    selectedDay: {
        color: '#67F2D1'
    },
    /* Day Buttons Begin */
    areaButtonContainer: {
        flex: 1,
        gap: 20,
        backgroundColor: '#171717',
        marginTop: 40,
    },
    areaButton: {
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
    areaButtonText: {
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
    activeStepPercentage: {
        backgroundColor: '#67F2D1',
        height: '100%',
        borderRadius: 10
    },
    workoutAreaText: {
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