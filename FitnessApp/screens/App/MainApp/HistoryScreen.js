import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../store/auth-context';
import moment from 'moment';

const HistoryScreen = () => {
    const authCtx = useContext(AuthContext);
    const [history, setHistory] = useState({});
    const [currentWeek, setCurrentWeek] = useState([]);

    useEffect(() => {
        const completedDays = authCtx.allWorkoutPlan 
            ? JSON.parse(authCtx.allWorkoutPlan)['daysCompleted']
            : {};
        setHistory(JSON.parse(completedDays));

        // Calculate the current week's days
        const today = moment();
        const startOfWeek = today.clone().startOf('isoWeek');
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push(startOfWeek.clone().add(i, 'days'));
        }
        setCurrentWeek(days);
    }, [authCtx.allWorkoutPlan]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Workout History</Text>

            {/* Calendar View */}
            <View style={styles.calendarContainer}>
                {currentWeek.map((day, index) => {
                    const formattedDay = day.format('YYYY-MM-DD');
                    const isCompleted = history[formattedDay] === '1';

                    return (
                        <View key={index} style={styles.dayWrapper}>
                            <Text style={[styles.dayText, isCompleted && styles.completedDayText]}>
                                {day.format('ddd')}
                            </Text>
                            <View
                                style={[
                                    styles.dayCircle,
                                    isCompleted && styles.completedDayCircle,
                                ]}
                            >
                                <Text 
                                  style={[
                                    styles.dayNumber,
                                    isCompleted && styles.completedDayCircleText
                                  ]}>{day.format('DD')}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>

            {/* Summary */}
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    {`Workouts Completed: ${
                        Object.values(history).filter(val => val === '1').length
                    } This Week`}
                </Text>
            </View>

            {/* History Details */}
            <ScrollView>
                {Object.keys(history)
                    .sort((a, b) => moment(a).diff(moment(b))) // Sort by date descending
                    .map((date, index) => (
                        history[date] === '1' && (
                            <View key={index} style={styles.historyCard}>
                                <Text style={styles.historyDate}>
                                    {moment(date).format('dddd, MMM DD')}
                                </Text>
                                <Text style={styles.historyDetails}>Workout Completed!</Text>
                            </View>
                        )
                    ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171717',
        padding: 27,
    },
    header: {
        fontSize: 24,
        color: '#67F2D1',
        fontFamily: 'roboto-bold',
        marginTop: 50,
        marginBottom: 20,
    },
    calendarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dayWrapper: {
        alignItems: 'center',
    },
    dayText: {
        color: '#B4B4B4',
        fontSize: 14,
    },
    completedDayText: {
        color: '#67F2D1',
    },
    dayCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
        marginTop: 5,
    },
    completedDayCircle: {
        backgroundColor: '#67F2D1',
    },
    completedDayCircleText: {
      color: '#171717',
    },
    dayNumber: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    summary: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#FFFFFF1A',
        borderRadius: 10,
    },
    summaryText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
    historyCard: {
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    historyDate: {
        color: '#67F2D1',
        fontSize: 18,
        fontFamily: 'roboto-bold',
    },
    historyDetails: {
        color: '#FFFFFF',
        fontSize: 14,
        marginTop: 5,
    },
});

export default HistoryScreen;