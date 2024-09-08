import { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from "react-native-gesture-handler";
import addCircle from "../../../assets/icons/add-circle";
import IconShare from "../../../components/ui/Icon";

const { width: screenWidth } = Dimensions.get('window');
const stepWidth = screenWidth / 5 - 17;

const data = [
    { label: 'Bench Press', value: 'bench_press' },
    { label: 'Squat', value: 'squat' },
    { label: 'Deadlift', value: 'deadlift' },
    { label: 'Pull-up', value: 'pull_up' },
    { label: 'Push-up', value: 'push_up' },
    { label: 'Plank', value: 'plank' },
    { label: 'Lunges', value: 'lunges' },
    { label: 'Leg Press', value: 'leg_press' },
    { label: 'Leg Curl', value: 'leg_curl' },
    { label: 'Leg Extension', value: 'leg_extension' },
    { label: 'Shoulder Press', value: 'shoulder_press' },
    { label: 'Bicep Curl', value: 'bicep_curl' },
    { label: 'Tricep Extension', value: 'tricep_extension' },
    { label: 'Lat Pulldown', value: 'lat_pulldown' },
    { label: 'Chest Fly', value: 'chest_fly' },
    { label: 'Chest Press', value: 'chest_press' },
    { label: 'Cable Row', value: 'cable_row' },
    { label: 'Leg Raise', value: 'leg_raise' },
    { label: 'Russian Twist', value: 'russian_twist' },
    { label: 'Bicycle Crunch', value: 'bicycle_crunch' },
    { label: 'Reverse Crunch', value: 'reverse_crunch' },
    { label: 'Mountain Climber', value: 'mountain_climber' },
    { label: 'Burpees', value: 'burpees' },
    { label: 'Jumping Jacks', value: 'jumping_jacks' },
    { label: 'High Knees', value: 'high_knees' },
    { label: 'Butt Kicks', value: 'butt_kicks' },
    { label: 'Squat Jumps', value: 'squat_jumps' },
    { label: 'Lunges with Twist', value: 'lunges_with_twist' },
    { label: 'Side Plank', value: 'side_plank' },
    { label: 'Superman', value: 'superman' },
    { label: 'Glute Bridge', value: 'glute_bridge' },
];
const sets = [
    { label: '1 Set', value: '1 Set' },
    { label: '2 Sets', value: '2 Sets' },
    { label: '3 Sets', value: '3 Sets' },
    { label: '4 Sets', value: '4 Sets' },
    { label: '5 Sets', value: '5 Sets' },
    { label: '6 Sets', value: '6 Sets' },
    { label: '7 Sets', value: '7 Sets' },
    { label: '8 Sets', value: '8 Sets' },
];
const reps = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
    { label: '13', value: '13' },
    { label: '14', value: '14' },
    { label: '15', value: '15' },
    { label: '16', value: '16' },
    { label: '17', value: '17' },
    { label: '18', value: '18' },
    { label: '19', value: '19' },
    { label: '20', value: '20' },
    { label: '21', value: '21' },
    { label: '22', value: '22' },
    { label: '23', value: '23' },
    { label: '24', value: '24' },
    { label: '25', value: '25' },
];

function DropDown({ data, selected, index, dKey, dropdownChange }) {
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={data}
                maxHeight={190}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                value={selected}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setIsFocus(false);
                    dropdownChange(item.value, index, dKey);
                }}
                containerStyle={styles.dropdownContainerStyle}
                activeColor="#67F2D1"
            />
        </View>
    );
}

function TargetExercises({ route, navigation }) {
    const { selectedDays, currentDay, daysWithTargetArea, daysWithTargetExercises } = route.params;
    const stepPercentage = ((currentDay + 1) / selectedDays.length) * 100;
    const defaultTargetExercises = [
        { exercise: 'bench_press', sets: '3 Sets', reps: '20' },
        { exercise: 'bench_press', sets: '3 Sets', reps: '20' },
        { exercise: 'bench_press', sets: '3 Sets', reps: '20' },
    ]

    const [exercises, setExercises] = useState(daysWithTargetExercises[selectedDays[currentDay]] || defaultTargetExercises);

    const handleBack = () => {
        if (currentDay === 0) {
            navigation.replace('TargetArea', {
                selectedDays: selectedDays,
                currentDay: selectedDays.length - 1,
                prevDaysData: daysWithTargetArea,
            });
            return;
        }

        navigation.replace('TargetExercises', {
            selectedDays: selectedDays,
            currentDay: currentDay - 1,
            daysWithTargetArea: daysWithTargetArea,
            daysWithTargetExercises: daysWithTargetExercises
        });
    }

    const handleNext = () => {
        if (currentDay === selectedDays.length - 1) {
            navigation.replace('AuthenticatedStack', {
                screen: 'Home',
                params: {
                    selectedDays: selectedDays,
                    daysWithTargetArea: daysWithTargetArea,
                    daysWithTargetExercises: {
                        ...daysWithTargetExercises,
                        [selectedDays[currentDay]]: exercises,
                    }
                }
            });
            return;
        }

        navigation.replace('TargetExercises', {
            selectedDays: selectedDays,
            currentDay: currentDay + 1,
            daysWithTargetArea: daysWithTargetArea,
            daysWithTargetExercises: {
                ...daysWithTargetExercises,
                [selectedDays[currentDay]]: exercises,
            }
        })
    }

    const dropdownChange = (value, index, key) => {
        const updatedExercises = exercises.map((exercise, i) => {
            if (i === index) {
                return {
                    ...exercise,
                    [key]: value,
                }
            }
            return exercise;
        });

        setExercises(updatedExercises);
    }

    return (
        <View style={styles.container}>
            <View style={styles.progressBarContainer}>
                <View style={styles.activeStep}></View>
                <View style={styles.activeStep}></View>
                <View style={styles.activeStep}></View>
                <View style={styles.activeStep}></View>
                <View style={styles.inactiveStep}>
                    <View style={[styles.activeStepPercentage, { width: stepPercentage + '%' }]}></View>
                </View>
            </View>
            <Text style={styles.workoutAreaText}>Which exercises will you work on <Text style={styles.selectedDay}>{selectedDays[currentDay]}?</Text></Text>
            <ScrollView style={styles.exercisesContainer}>
                <View style={styles.exercisesContainerView}>
                    {exercises.map((exercise, index) => (
                        <View key={index} style={styles.exerciseContainer}>
                            <View style={styles.firstRow}>
                                <DropDown data={data} dKey="exercise" selected={exercise.exercise} index={index} dropdownChange={dropdownChange} />
                            </View>
                            <View style={styles.secondRow}>
                                <View style={styles.setRepItem}>
                                    <DropDown data={sets} dKey="sets" selected={exercise.sets} index={index} dropdownChange={dropdownChange} />
                                </View>
                                <View style={styles.setRepItem}>
                                    <DropDown data={reps} dKey="reps" selected={exercise.reps} index={index} dropdownChange={dropdownChange} />
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
                <TouchableOpacity
                    style={styles.addMoreButton}
                    onPress={() => setExercises([...exercises, { exercise: '', sets: '', reps: '' }])}
                >
                    <IconShare width={22} height={22} xmlData={addCircle} />
                    <Text style={styles.addMoreText}>Add more</Text>
                </TouchableOpacity>
            </ScrollView>
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

export default TargetExercises;

const styles = StyleSheet.create({
    selectedDay: {
        color: '#67F2D1'
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

    /* ********** Dropdown ********** */
    exercisesContainer: {
        flex: 1,
        marginTop: 40,
        marginBottom: 50,
    },
    exercisesContainerView: {
        gap: 20,
    },
    exerciseContainer: {
        backgroundColor: '#FFFFFF0D',
        padding: 8,
        borderRadius: 10,
    },
    firstRow: {
        marginBottom: 12,
    },
    secondRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    dropdown: {
        height: 50,
        paddingHorizontal: 12,
        backgroundColor: '#FFFFFF1A',
        borderColor: '#D4D4D433',
        borderWidth: 1,
        borderRadius: 8,
    },
    setRepItem: {
        flex: 1,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 1,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        fontFamily: 'roboto-regular',
        fontSize: 18,
        lineHeight: 42,
        color: '#FFFFFF',
    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily: 'roboto-regular',
        fontSize: 18,
        lineHeight: 42,
        color: '#FFFFFF',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    addMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    addMoreText: {
        color: '#FFFFFF',
        fontFamily: 'roboto-condensed-regular',
        fontSize: 16,
        lineHeight: 42,
        marginLeft: 10,
        textDecorationLine: 'underline',
    },
    dropdownContainerStyle: {
        backgroundColor: '#D3E1F9', // Customize this to change the background color of the dropdown
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
});