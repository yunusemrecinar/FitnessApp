import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import dumbell from '../../../assets/icons/dumbell';
import exclamation from '../../../assets/icons/exclamation';
import target from '../../../assets/icons/target';
import IconShare from '../../../components/ui/Icon';
import { AuthContext } from '../../../store/auth-context';

// const { width } = Dimensions.get('window');

const HomeScreen = () => {
    const exercises = [
        { id: '1', name: 'Flat Barbell Bench Press', sets: 4, reps: 12 },
        { id: '2', name: 'Incline Dumbbell Press', sets: 3, reps: 10 },
        { id: '3', name: 'Dumbbell Flyes', sets: 3, reps: 12 },
        // Add more exercises as needed
    ];
    const authCtx = useContext(AuthContext);
    const [currentDay, setCurrentDay] = useState(moment().format('dddd'));
    const [workoutPlans, setWorkoutPlans] = useState(authCtx.allWorkoutPlan && JSON.parse(authCtx.allWorkoutPlan));

    useEffect(() => { // when the component is mounted
        authCtx.fetchWorkoutPlan();
    }, []);

    useEffect(() => {
        setWorkoutPlans(authCtx.allWorkoutPlan && JSON.parse(authCtx.allWorkoutPlan));
    }, [authCtx.allWorkoutPlan]);

    const renderExerciseCard = ({ item, index }) => (
        <View style={styles.fCard} key={index}>
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
                    {/* progress row */}
                    <View style={styles.exclamationRow}>
                        <IconShare width={19} height={19} xmlData={exclamation} />
                        <Text style={styles.description}>5-10 mins cardio before workout</Text>
                    </View>
                    <View style={styles.exercises}>
                        <Text style={styles.exerciseHeader}>Exercises</Text>
                        <FlatList
                            horizontal
                            data={workoutPlans && JSON.parse(workoutPlans['daysWithTargetExercises'])[currentDay]}
                            renderItem={renderExerciseCard}
                            keyExtractor={(item, index) => index}
                            contentContainerStyle={styles.list}
                            showsHorizontalScrollIndicator={false}
                        />
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
        width: 125,
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 10,
        paddingBottom: 15,
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#D4D4D433',
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
        marginBottom: 40,
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
});

export default HomeScreen;
