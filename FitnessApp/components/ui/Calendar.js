import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Calendar = () => {
    const [weekDays, setWeekDays] = useState([]);

    useEffect(() => {
        // Function to calculate current week's days
        const getCurrentWeek = () => {
            const today = moment();
            const startOfWeek = today.clone().startOf('isoWeek'); // Monday as the start of the week
            const days = [];

            for (let i = 0; i < 7; i++) {
                days.push(startOfWeek.clone().add(i, 'days'));
            }

            return days;
        };

        const days = getCurrentWeek();
        setWeekDays(days);
    }, []);

    return (
        <View style={styles.container}>
            {weekDays.map((day, index) => (
                <TouchableOpacity>
                    <View key={index} style={styles.dayContainer}>
                        <Text style={styles.dayText}>{day.format('DD')}</Text>
                        <Text style={styles.dayText}>{day.format('ddd')}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    dayContainer: {
        alignItems: 'center',
        gap: 10,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#FFFFFF33',
    },
    dayText: {
        color: '#67F2D1',
        fontFamily: 'roboto-bold',
        fontSize: 16,
    },
});

export default Calendar;
