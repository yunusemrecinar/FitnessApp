import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import dumbell from '../../../assets/icons/dumbell';
import exclamation from '../../../assets/icons/exclamation';
import target from '../../../assets/icons/target';
import FlatButton from '../../../components/ui/FlatButton';
import IconShare from '../../../components/ui/Icon';
import { AuthContext } from '../../../store/auth-context';

// const { width } = Dimensions.get('window');

const HomeScreen = () => {
    const authCtx = useContext(AuthContext);
    const [currentDay, setCurrentDay] = useState(moment().format('dddd'));
    const [workoutPlans, setWorkoutPlans] = useState(authCtx.allWorkoutPlan && JSON.parse(authCtx.allWorkoutPlan));

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
                            <Text style={styles.fExerciseName}>{exercise.exercise}</Text>
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

    const RenderExerciseCard = ({ item, index }) => (
        <View style={styles.fCard}>
            <View style={styles.fNumberCircle}>
                <Text style={styles.fNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.fDescription}>
                <Text style={styles.fExerciseName}>{item.exercise}</Text>
                <Text style={styles.fExerciseDetails}>{`${item.sets}   x${item.reps}`}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Calendar setCurrentDay={setCurrentDay} />
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
                        <FlatButton onPress={() => {}}>Complete</FlatButton>
                    </View>
                </View>
                )
            }
        </View>
    );
};

const Calendar = ({ setCurrentDay }) => {
    const [weekDays, setWeekDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'));

    const calendarWidth = 350; // Total calendar width based on container width
    const dayWidth = calendarWidth / 7; // Width of each day
    const animatedPosition = useSharedValue(0); // Starting position for the highlight

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

        // Initially set the animated position to today's day
        const todayIndex = days.findIndex(day => day.format('YYYY-MM-DD') === selectedDay);
        animatedPosition.value = todayIndex * dayWidth;
    }, []);

    const handleDayPress = (day, index) => {
        setSelectedDay(day.format('YYYY-MM-DD'));
        setCurrentDay(day.format('dddd'));
        animatedPosition.value = withTiming(index * dayWidth, { duration: 300 }); // Animate to the new day position
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: animatedPosition.value }],
        };
    });

    return (
        <View style={styles.calendarContainer}>
            <View style={{ flexDirection: 'row' }}>
                <Animated.View
                    style={[
                        styles.highlight, // Animated highlight border
                        animatedStyle
                    ]}
                />
                {weekDays.map((day, index) => (
                    <TouchableOpacity key={index} onPress={() => handleDayPress(day, index)}>
                        <View style={styles.dayContainer}>
                            <Text style={[styles.dayText, selectedDay === day.format('YYYY-MM-DD') && [styles.selectedDayText]]}>{day.format('DD')}</Text>
                            <Text style={[styles.dayText, selectedDay === day.format('YYYY-MM-DD') && styles.selectedDayText]}>{day.format('ddd')}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
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
        color: '#67F2D1',
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
});

export default HomeScreen;
