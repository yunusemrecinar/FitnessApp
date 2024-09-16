import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import xIcon from '../../../assets/icons/x-icon';
import IconShare from '../../../components/ui/Icon';

const WorkoutDetailScreen = ({ route, navigation }) => {
    const { workoutDay, workoutPlans } = route.params;
    const handleCloseModal = () => {
        navigation.goBack(); // Close the modal
    };

    return (
        <View style={styles.modalWrapper}>
            <TouchableWithoutFeedback onPress={handleCloseModal}>
                <View style={styles.transparentArea} />
            </TouchableWithoutFeedback>

            <View style={styles.modalContainer}>
                <View style={{ position: 'absolute', top: 27, right: 27, zIndex: 999 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <IconShare width={12} height={12} xmlData={xIcon} />
                    </TouchableOpacity> 
                </View>
                <View style={styles.workoutContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{workoutDay}</Text>
                        <View style={styles.workoutArea}>
                            {JSON.parse(workoutPlans['daysWithTargetArea'])[workoutDay].map((area, index) => (
                                <View key={index} style={styles.workoutAreaView}>
                                    <Text style={styles.workoutAreaText}>{area}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <ScrollView>
                        <View style={styles.workouts}>
                            {JSON.parse(workoutPlans['daysWithTargetExercises'])[workoutDay].map((exercise, index) => (
                                <View style={styles.workout} key={index}>
                                    <View>
                                        <View style={styles.workoutCardLeft}>
                                            <Text style={styles.workoutTitleText}>{index + 1}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.workoutCardRight}>
                                        <Text style={styles.workoutRowTitle}>{exercise['exercise']}</Text>
                                        <View style={styles.workoutSetRep}>
                                            <Text style={styles.workoutSetRepText}>{exercise['sets']}</Text>
                                            <Text style={styles.workoutSetRepText}>x{exercise['reps']}</Text>
                                        </View>    
                                    </View>

                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 1,
    },
    transparentArea: {
        flex: 0.15, // 15% of the screen height
    },
    modalContainer: {
        position: 'relative',
        flex: 0.85, // 85% of the screen height
        backgroundColor: '#171717',
        borderTopWidth: 1,
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30,
        borderColor: '#D4D4D433',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    workoutContent: {
        paddingTop: 40,
        paddingHorizontal: 27,
    },
    header: {
        flexDirection: 'row',
        gap: 18,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#67F2D1',
        fontFamily: 'roboto-bold',
    },
    workoutArea: {
        flexDirection: 'row',
        gap: 7,
    },
    workoutAreaView: {
        paddingHorizontal: 9,
        paddingVertical: 3,
        backgroundColor: '#FFFFFF1A',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D4D4D433',
    },
    workoutAreaText: {
        color: '#CBCBCB',
        fontFamily: 'roboto-bold',
        fontSize: 14,
    },
    workouts: {
        marginTop: 42,
        gap: 16,
        marginBottom: 70,
    },
    workout: {
        backgroundColor: '#FFFFFF0D',
        borderWidth: 1,
        borderColor: '#D4D4D433',
        borderRadius: 10,
        paddingVertical: 15,
        paddingBottom: 20,
        paddingLeft: 9,
        flexDirection: 'row',
        gap: 14,
    },
    workoutCardLeft: {
        padding: 4,
        paddingHorizontal: 9,
        backgroundColor: '#FFFFFF1A',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D4D4D433',
    },
    workoutTitleText: {
        fontFamily: 'roboto-bold',
        fontSize: 16,
        color: '#67F2D1',
    },
    workoutCardRight: {
        gap: 11,
    },
    workoutRowTitle: {
        fontFamily: 'roboto-bold',
        fontSize: 20,
        color: '#FFFFFF',
    },
    workoutSetRep: {
        flexDirection: 'row',
        gap: 40,
    },
    workoutSetRepText: {
        color: '#B4B4B4',
        fontFamily: 'roboto-regular',
        fontSize: 18,
    }
});

export default WorkoutDetailScreen;
