import { useRoute } from "@react-navigation/native";
import { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import addCircle from "../../../assets/icons/add-circle";
import xIcon from "../../../assets/icons/x-icon";
import IconShare from "../../../components/ui/Icon";
import { AuthContext } from "../../../store/auth-context";
import { addNewWorkout } from "../../../util/http";

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

const weekDays = [
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
    { label: 'Sunday', value: 'Sunday' },
];

function DropDown({ dataSet, selected, index, dKey, dropdownChange, data, setData, isDaySelected }) {
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: '#67F2D1', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={dataSet}
                maxHeight={190}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                value={selected}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    if (!isDaySelected(item.value)) {
                        setIsFocus(false);
                        dropdownChange(item.value, index, dKey, data, setData);
                    }
                }}
                renderItem={(item) => (
                    <TouchableOpacity
                        disabled={!isDaySelected(item.value)} // Disable touch interaction for already selected days
                        style={{
                            opacity: isDaySelected(item.value) ? 0.25 : 1, // Dim the already selected items
                            padding: 10,
                        }}
                    >
                        <Text style={{ color: '#FFFFFF' }}>{item.label}</Text>
                    </TouchableOpacity>
                )}
                containerStyle={styles.dropdownContainerStyle}
                activeColor="#444F4C"
                itemTextStyle={{ color: '#FFFFFF' }}
            />
        </View>
    );
}

function AddWorkoutScreen({ navigation }) {
    const authCtx = useContext(AuthContext);
    const route = useRoute();
    const { workoutDays } = route.params;
    const [workoutDay, setWorkoutDay] = useState([
        { day: 'Monday' },
    ]);
    const [exercises, setExercises] = useState([
        { exercise: 'bench_press', sets: '3 Sets', reps: '20' },
    ]);
    const [notes, setNotes] = useState('');

    const [selectedArea, setSelectedArea] = useState(['Chest', 'Legs']);

    const areas = ['Arms', 'Chest', 'Belly', 'Buff', 'ABC', 'Legs'];

    const toggleArea = (area) => {
        if (selectedArea.includes(area)) {
            setSelectedArea(selectedArea.filter(selectedArea => selectedArea !== area));
        } else {
            setSelectedArea([...selectedArea, area]);
        }
    };

    const isDaySelected = (dayValue) => workoutDays.some(wd => wd === dayValue);

    const dropdownChange = (value, index, key, data, setData) => {
        const updatedData = data.map((exercise, i) => {
            if (i === index) {
                return {
                    ...exercise,
                    [key]: value,
                }
            }
            return exercise;
        });

        setData(updatedData);
    }

    const addWorkoutHandler = async () => {
        const token = authCtx.token;
        const newWorkout = {
            day: workoutDay[0].day,
            exercises: exercises,
            areas: selectedArea,
            notes: notes,
        };

        try {
            const response = await addNewWorkout(token, newWorkout);
            console.log(response);
        } catch (error) {
            Alert.alert('Error', error.message || 'Something went wrong');
        }

        console.log(newWorkout);
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
        <View style={styles.modalWrapper}>
            <View style={styles.container}>
                <View style={{ position: 'absolute', top: 27, right: 27, zIndex: 999 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <IconShare width={12} height={12} xmlData={xIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.newWorkoutPlan}> 
                    <Text style={styles.headerText}>New workout plan</Text>
                    <ScrollView 
                        style={styles.exercisesContainer} 
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ flexGrow: 1 }}    
                    >
                        <View style={styles.newWorkoutDay}>
                            <Text style={styles.newWorkoutDayText}>Day</Text>
                            <View style={styles.newWorkoutDayDropdown}>
                                <DropDown
                                    dataSet={weekDays}
                                    selected={workoutDay[0].day}
                                    index={0}
                                    dKey="day"
                                    dropdownChange={dropdownChange}
                                    data={workoutDay}
                                    setData={setWorkoutDay}
                                    isDaySelected={isDaySelected}
                                />
                            </View>
                        </View>
                        <Text style={styles.areasText}>Area</Text>
                        <AreaButtons />
                        <Text style={styles.newWorkoutExerciseText}>Exercises</Text>
                        <View style={styles.exercisesContainerView}>
                            {exercises.map((exercise, index) => (
                                <View key={index} style={styles.exerciseContainer}>
                                    <View style={styles.firstRow}>
                                        <DropDown dataSet={data} dKey="exercise" selected={exercise.exercise} index={index} dropdownChange={dropdownChange} data={exercises} setData={setExercises} />
                                    </View>
                                    <View style={styles.secondRow}>
                                        <View style={styles.setRepItem}>
                                            <DropDown dataSet={sets} dKey="sets" selected={exercise.sets} index={index} dropdownChange={dropdownChange} data={exercises} setData={setExercises} />
                                        </View>
                                        <View style={styles.setRepItem}>
                                            <DropDown dataSet={reps} dKey="reps" selected={exercise.reps} index={index} dropdownChange={dropdownChange} data={exercises} setData={setExercises} />
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
                        <Text style={styles.noteText}>Note</Text>
                        <TextInput
                            multiline
                            numberOfLines={4}
                            value={notes}
                            onChangeText={setNotes}
                            style={styles.exerciseNoteInput}
                            placeholder="Add note..."
                            placeholderTextColor='#C8C8C8'
                        />
                        <TouchableOpacity
                            style={styles.doneButton}
                            onPress={addWorkoutHandler}
                        >
                            <Text style={styles.buttonText}>Done</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View> 
        </View>
    )
}

export default AddWorkoutScreen;

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 1,
        backgroundColor: '#000000',
    },
    container: {
        flex: 1,
        backgroundColor: '#171717',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    newWorkoutPlan: {
        paddingHorizontal: 27,
        paddingTop: 50,
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontFamily: 'roboto-condensed-semibold',
    },
    exercisesContainer: {
        marginBottom: 50,
    },
    newWorkoutDay: {
        marginTop: 43,
    },
    newWorkoutDayText: {
        fontFamily: 'roboto-medium',
        fontSize: 16,
        color: '#FFFFFF',
    },
    newWorkoutDayDropdown: {
        marginTop: 12,
    },
    areasText: {
        fontFamily: 'roboto-medium',
        fontSize: 16,
        color: '#FFFFFF',
        marginTop: 20,
        marginBottom: 12,
    },
    /* Day Buttons Begin */
    areaButtonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 12,
        backgroundColor: '#171717',
        justifyContent: 'space-between',
    },
    areaButton: {
        height: 50,
        width: '31%', // Adjust to fit 3 buttons in a row
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
    /* dropdown begin */
    exercisesContainerView: {
        gap: 20,
    },
    newWorkoutExerciseText: {
        fontFamily: 'roboto-medium',
        fontSize: 16,
        color: '#FFFFFF',
        marginTop: 20,
        marginBottom: 12,
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
    dropdownContainerStyle: {
        backgroundColor: '#393939', // Customize this to change the background color of the dropdown
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderWidth: 1,
        borderColor: '#D4D4D433',
    },
    /* dropdown end */
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
    noteText: {
        fontFamily: 'roboto-medium',
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 12,
    },
    exerciseNoteInput: {
        height: 65,
        backgroundColor: '#FFFFFF1A',
        color: '#C8C8C8',
        padding: 8,
        fontSize: 16,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#D4D4D433',
        marginBottom: 25,
    },
    doneButton: {
        backgroundColor: '#67F2D1', // button background color
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    buttonText: {
        color: '#222222', // black text on button
        fontSize: 18,
        alignItems: 'center',
        fontFamily: 'roboto-condensed-semibold',
    },
});