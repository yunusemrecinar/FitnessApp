import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import dumbell from '../../../assets/icons/dumbell';
import exclamation from '../../../assets/icons/exclamation';
import target from '../../../assets/icons/target';
import FlatButton from '../../../components/ui/FlatButton';
import IconShare from '../../../components/ui/Icon';
import { AuthContext } from '../../../store/auth-context';
import { completeWorkout } from '../../../util/http';

const exerciseLabel = {
    'bench_press': 'Bench Press',
    'squat': 'Squat',
    'deadlift': 'Deadlift',
    'pull_up': 'Pull-up',
    'push_up': 'Push-up',
    'plank': 'Plank',
    'lunges': 'Lunges',
    'leg_press': 'Leg Press',
    'leg_curl': 'Leg Curl',
    'leg_extension': 'Leg Extension',
    'shoulder_press': 'Shoulder Press',
    'bicep_curl': 'Bicep Curl',
    'tricep_extension': 'Tricep Extension',
    'lat_pulldown': 'Lat Pulldown',
    'chest_fly': 'Chest Fly',
    'chest_press': 'Chest Press',
    'cable_row': 'Cable Row',
    'leg_raise': 'Leg Raise',
    'russian_twist': 'Russian Twist',
    'bicycle_crunch': 'Bicycle Crunch',
    'reverse_crunch': 'Reverse Crunch',
    'mountain_climber': 'Mountain Climber',
    'burpees': 'Burpees',
    'jumping_jacks': 'Jumping Jacks',
    'high_knees': 'High Knees',
    'butt_kicks': 'Butt Kicks',
    'squat_jumps': 'Squat Jumps',
    'lunges_with_twist': 'Lunges with Twist',
    'side_plank': 'Side Plank',
    'superman': 'Superman',
    'glute_bridge': 'Glute Bridge',
};

const HomeScreen = () => {
    const authCtx = useContext(AuthContext);
    const [currentDay, setCurrentDay] = useState(moment().format('dddd'));
    const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'));
    const [workoutPlans, setWorkoutPlans] = useState(authCtx.allWorkoutPlan && JSON.parse(authCtx.allWorkoutPlan));
    const [loading, setLoading] = useState(false);

    useEffect(() => { // when the component is mounted
        authCtx.fetchWorkoutPlan();
    }, []);

    useEffect(() => {
        setWorkoutPlans(authCtx.allWorkoutPlan && JSON.parse(authCtx.allWorkoutPlan));
    }, [authCtx.allWorkoutPlan]);

    const updateExerciseWeight = (exerciseId, weight) => {
        setWorkoutPlans((prevWorkoutPlans) => {
            const updatedPlans = { ...prevWorkoutPlans };
            const exercisesForDay = JSON.parse(updatedPlans['daysWithTargetExercises'])[currentDay].map((exercise, index) => {
                if (index === exerciseId) {
                    return { ...exercise, weight: weight };
                }
                return exercise;
            });

            updatedPlans['daysWithTargetExercises'] = {
                ...JSON.parse(updatedPlans['daysWithTargetExercises']),
                [currentDay]: exercisesForDay,
            };

            // Convert back to JSON string
            updatedPlans['daysWithTargetExercises'] = JSON.stringify(updatedPlans['daysWithTargetExercises']);

            authCtx.setAllPlan(JSON.stringify(updatedPlans));
            return updatedPlans;
        });
    };

    const ExerciseCard = ({ exercise, index }) => {
        const [modalVisible, setModalVisible] = useState(false);
        const [weight, setWeight] = useState(exercise.weight || '');

        return (
            <>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View style={styles.fCard}>
                        <View style={styles.fNumberCircle}>
                            <Text style={styles.fNumberText}>{index + 1}</Text>
                        </View>
                        <View style={styles.fDescription}>
                            <Text style={styles.fExerciseWeight}>{`Weight: ${weight ? (weight + ' kg') : '??'}`}</Text>
                            <Text style={styles.fExerciseName}>{exerciseLabel[exercise.exercise]}</Text>
                            <Text style={styles.fExerciseDetails}>{`${exercise.sets}   x${exercise.reps}`}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Set Weight</Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Enter weight"
                                value={weight}
                                keyboardType="numeric"
                                onChangeText={(text) => setWeight(text)}
                            />

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={() => {
                                        updateExerciseWeight(index, weight);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={styles.saveButtonText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </>
        );
    };

    const handleCompleteWorkout = async () => {
        setLoading(true); // Start loading
        const token = authCtx.token;
        const completedWorkoutDay = selectedDay;

        try {
            // Safely update the workoutPlans context with the new data
            const daysCompleted = typeof workoutPlans['daysCompleted'] === 'string' 
            ? JSON.parse(workoutPlans['daysCompleted']) 
            : workoutPlans['daysCompleted'];

            const daysWithTargetExercises = typeof workoutPlans['daysWithTargetExercises'] === 'string'
            ? JSON.parse(workoutPlans['daysWithTargetExercises'])
            : workoutPlans['daysWithTargetExercises'];

            const response = await completeWorkout(token, completedWorkoutDay, daysWithTargetExercises);

            // update the workoutPlans context with the new data
            const updatedWorkoutPlans = {
                ...workoutPlans,
                daysCompleted: {
                    ...daysCompleted,
                    [completedWorkoutDay]: '1',
                },
            };

            // Convert back to JSON string
            updatedWorkoutPlans['daysCompleted'] = JSON.stringify(updatedWorkoutPlans['daysCompleted']);
            authCtx.setAllPlan(JSON.stringify(updatedWorkoutPlans));
        } catch (error) {
            if (error.response && error.response.status === 401) {
                authCtx.logout();
                Alert.alert('Session Expired', 'Please log in again');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AuthStack' }]  // Reset to AuthStack
                });
            } else {
                Alert.alert('Error', error.response.message || 'Something went wrong');
            }
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <View style={styles.container}>
            <Calendar setCurrentDay={setCurrentDay} selectedDay={selectedDay} setSelectedDay={setSelectedDay} trainingDays={workoutPlans ? workoutPlans.selectedDays : []} completedDay={workoutPlans?.daysCompleted} /> 
            <View style={styles.line} />
            {workoutPlans &&
                workoutPlans['daysWithTargetArea'] &&
                JSON.parse(workoutPlans['daysWithTargetArea'])[currentDay] && (
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={styles.todaysWorkout}>
                        <View style={styles.planHeader}>
                            <Text style={styles.planHeaderText}>Today's Plan:</Text>
                        </View>
                        <View style={styles.workoutIntro}>
                            <View style={[styles.halfCard, styles.workoutArea]}>
                                <View style={styles.workoutAreaFirstRow}>
                                    <Text style={styles.cardInfo}>{workoutPlans &&  JSON.parse(workoutPlans['daysWithTargetArea'])[currentDay][0]}</Text>
                                    <IconShare width={34} height={34} xmlData={target} />
                                </View>
                                <Text style={styles.description}>Target Area</Text>
                            </View>
                            <View style={[styles.halfCard, styles.workoutExerciseNum]}>
                                <View style={styles.workoutAreaFirstRow}>
                                    <Text style={styles.cardInfo}>{workoutPlans && JSON.parse(workoutPlans['daysWithTargetExercises'])[currentDay].length}</Text>
                                    <IconShare width={34} height={34} xmlData={dumbell} />
                                </View>
                                <Text style={styles.description}>Target Area</Text>
                            </View>
                        </View>
                        <View style={styles.exclamationRow}>
                            <IconShare width={19} height={19} xmlData={exclamation} />
                            <Text style={styles.description}>5-10 mins cardio before workout</Text>
                        </View>
                        <View style={styles.exercises}>
                            <Text style={styles.exerciseHeader}>Exercises</Text>
                            <FlatList
                                horizontal
                                data={workoutPlans && JSON.parse(workoutPlans['daysWithTargetExercises'])[currentDay]}
                                renderItem={({ item, index }) => <ExerciseCard exercise={item} index={index} />}
                                keyExtractor={(item, index) => index}
                                contentContainerStyle={styles.list}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>
                    <View style={{ marginBottom: 22 }}>
                    {JSON.parse(workoutPlans['daysCompleted'])[selectedDay] ? (
                        <FlatButton disabled={true}>
                            Completed
                        </FlatButton>
                    ) : (
                        <FlatButton onPress={handleCompleteWorkout} disabled={loading}>
                            {loading ? 'Completing...' : 'Complete'}
                        </FlatButton>
                    )}
                    </View>
                </View>
                )
            }
        </View>
    );
    
};

const Calendar = ({ setCurrentDay, selectedDay, setSelectedDay, trainingDays, completedDay }) => {
    const [weekDays, setWeekDays] = useState([]);
    const calendarWidth = 350; // Total calendar width based on container width
    const dayWidth = calendarWidth / 7; // Width of each day
    const animatedPosition = useSharedValue(0);
    const completedDaysArray = completedDay ? Object.keys(JSON.parse(completedDay)) : [];
    let trainingDaysDates = [];

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: animatedPosition.value }],
        };
    });

    useEffect(() => {
        const getCurrentWeek = () => {
            const today = moment();
            const startOfWeek = today.clone().startOf('isoWeek');
            const days = [];
            for (let i = 0; i < 7; i++) {
                days.push(startOfWeek.clone().add(i, 'days'));
            }
            return days;
        };

        const days = getCurrentWeek();
        setWeekDays(days);

        trainingDaysDates = days
            .filter(day => trainingDays.includes(day.format('dddd')))
            .map(day => day.format('YYYY-MM-DD'));

        const todayIndex = days.findIndex(day => day.format('YYYY-MM-DD') === selectedDay);
        animatedPosition.value = todayIndex * dayWidth;
    }, []);

    const handleDayPress = (day, index) => {
        setSelectedDay(day.format('YYYY-MM-DD'));
        setCurrentDay(day.format('dddd'));
        animatedPosition.value = withTiming(index * dayWidth, { duration: 300 });
    };

    return (
        <View style={styles.calendarContainer}>
            <View style={{ flexDirection: 'row' }}>
                <Animated.View style={[styles.highlight, animatedStyle]} />
                {weekDays.map((day, index) => {
                    const formattedDay = day.format('YYYY-MM-DD');
                    const isTrainingDay = trainingDaysDates.includes(formattedDay);
                    const isCompleted = completedDaysArray.includes(formattedDay);
                    const isMissed = isTrainingDay && !isCompleted;

                    return (
                        <TouchableOpacity key={index} onPress={() => handleDayPress(day, index)}>
                            <View
                                style={[
                                    styles.dayContainer,
                                    isTrainingDay && styles.trainingDayBorder,
                                    isMissed && styles.missedTrainingBorder,
                                    selectedDay === formattedDay && styles.selectedDayBorder,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.dayText,
                                        selectedDay === formattedDay && styles.selectedDayText,
                                    ]}
                                >
                                    {day.format('DD')}
                                </Text>
                                <Text
                                    style={[
                                        styles.dayText,
                                        selectedDay === formattedDay && styles.selectedDayText,
                                    ]}
                                >
                                    {day.format('ddd')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171717',
        paddingHorizontal: 17,
        paddingTop: 60,
    },
    calendarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        position: 'relative', // To contain the animated highlight
    },
    highlight: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 50, // Slightly smaller than day width
        borderRadius: 8,
        borderColor: '#67F2D1',
        borderWidth: 1,
        zIndex: -1, // Keep it below the text
    },
    dayContainer: {
        alignItems: 'center',
        paddingVertical: 10,
        width: 50, // Each day takes equal space
        gap: 11,
    },
    selectedDayText: {
        color: '#171717',
    },
    dayText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'roboto-condensed-semibold',
    },
    line: {
        height: 1,
        backgroundColor: '#FFFFFF33',
        marginVertical: 10,
    },
    todaysWorkout: {
        marginTop: 28,
    },
    planHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    planHeaderText: {
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily: 'roboto-bold',
    },
    workoutIntro: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    halfCard: {
        flex: 1,
        backgroundColor: '#FFFFFF1A',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D4D4D433',
    },
    workoutAreaFirstRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        alignItems: 'center',
    },
    cardInfo: {
        fontFamily: 'roboto-bold',
        fontSize: 24,
        color: '#FFFFFF',
    },
    description: {
        color: '#B4B4B4',
        fontSize: 16,
        fontFamily: 'roboto-bold',
    },
    exerciseHeader: {
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily: 'roboto-bold',
        marginBottom: 20,
        marginTop: 25
    },  
    exclamationRow: {
        flexDirection: 'row',
        marginTop: 15,
        gap: 11,
    },
    trainingDayStyle: {
        backgroundColor: '#2D8CFF', // A light blue for training days
        borderRadius: 8,
    },
    selectedDayStyle: {
        backgroundColor: '#67F2D1',
    },
    /* Flat List Exercise */
    fCard: {
        height: 160,
        width: 125,
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 10,
        paddingBottom: 15,
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#D4D4D433',
        justifyContent: 'space-between',
    },
    fNumberCircle: {
        backgroundColor: '#FFFFFF1A',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D4D4D433',
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fNumberText: {
        color: '#67F2D1',
        fontSize: 18,
        fontWeight: 'bold',
    },
    fDescription: {
        gap: 6,
    },
    fExerciseName: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'roboto-medium',
        lineHeight: 22,
    },
    fExerciseDetails: {
        color: '#B4B4B4',
        fontFamily: 'roboto-regular',
        fontSize: 16,
    },
    fExerciseWeight: {
        color: '#B4B4B4',
        fontFamily: 'roboto-mediumitalic',
        fontSize: 12,
    },
    /* Flat List Exercise */
    exerciseCard: {
        backgroundColor: '#2D2D2D',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end', // Push the modal to the bottom
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        backgroundColor: '#1A1A1A', // Match your app's dark theme
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '35%', // Occupy only 35% of the screen
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        color: '#FFF',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        marginBottom: 20,
        backgroundColor: '#FFF', // White input background
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#444', // Gray for cancel
        padding: 12,
        paddingVertical: 18,
        borderRadius: 10,
        flex: 0.48,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#00D9A5', // Accent color for save
        padding: 12,
        paddingVertical: 18,
        borderRadius: 10,
        flex: 0.48,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    completedButton: {
        backgroundColor: '#ccc', // Gray background for completed
        paddingVertical: 18,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },    
    calendarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
    },
    dayContainer: {
        alignItems: 'center',
        paddingVertical: 10,
        width: 50,
    },
    dayText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    trainingDayBorder: {
        borderWidth: 2,
        borderColor: '#67F2D1', // Subtle green border for training days
        borderRadius: 8,
    },
    missedTrainingBorder: {
        borderWidth: 2,
        borderColor: '#FF6B6B', // Red border for missed training days
        borderRadius: 8,
    },
    selectedDayBorder: {
        borderWidth: 2,
        borderColor: '#FFFFFF', // Highlighted border for selected day
        borderRadius: 8,
    },
    selectedDayText: {
        color: '#67F2D1',
    },
    highlight: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 50,
        borderRadius: 8,
        borderColor: '#67F2D1',
        borderWidth: 1,
        zIndex: -1,
    },
});

export default HomeScreen;
