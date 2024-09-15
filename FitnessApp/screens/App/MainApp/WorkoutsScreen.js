import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import addCircle from "../../../assets/icons/add-circle";
import IconShare from "../../../components/ui/Icon";
import { AuthContext } from "../../../store/auth-context";

function WorkoutsScreen({ route, navigation }) {
    const authCtx = useContext(AuthContext);
    const [workoutPlans, setWorkoutPlans] = useState(authCtx.allWorkoutPlan && JSON.parse(authCtx.allWorkoutPlan));

    useEffect(() => { // when the component is mounted
        authCtx.fetchWorkoutPlan();
    }, []);

    useEffect(() => {
        setWorkoutPlans(authCtx.allWorkoutPlan && JSON.parse(authCtx.allWorkoutPlan));
        // console.log(authCtx.allWorkoutPlan);
    }, [authCtx.allWorkoutPlan]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>All workout plans</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddWorkout', {
                        workoutDays: JSON.parse(workoutPlans['selectedDays'])
                    })}
                >
                    <IconShare width={28} height={28} xmlData={addCircle} />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.workouts}>
                <View style={styles.workoutsView}>
                    {workoutPlans && JSON.parse(workoutPlans['selectedDays']).map((workoutDay, index) => (
                        <View key={index}>
                            <Text style={styles.workoutTitleText}>{workoutDay}</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('WorkoutDetail', {
                                    workoutDay: workoutDay,
                                    workoutPlans: workoutPlans
                                })}
                            >
                                <View style={styles.workoutCard}>
                                    <View style={[styles.workoutRow, styles.workoutTarget]}>
                                        <Text style={styles.workoutRowTitle}>Target:</Text>
                                        {JSON.parse(workoutPlans['daysWithTargetArea'])[workoutDay].map((target, index, array) => (
                                            <Text style={styles.workoutRowText} key={index}>
                                                {target}{index < array.length - 1 ? ', ' : ''}
                                            </Text>
                                        ))}
                                    </View>
                                    <View style={[styles.workoutRow, styles.workoutExercises]}>
                                        <Text style={styles.workoutRowTitle}>Exercises:</Text>
                                        <Text style={styles.workoutRowText}>
                                            {JSON.parse(workoutPlans['daysWithTargetExercises'])[workoutDay].length} total
                                        </Text>
                                    </View>
                                    <View style={[styles.workoutRow, styles.workoutNote]}>
                                        <Text style={styles.workoutRowTitle}>Note:</Text>
                                        <Text style={styles.workoutRowText}>
                                            {JSON.parse(workoutPlans['daysWithNotes'])[workoutDay]}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

export default WorkoutsScreen;

const styles = StyleSheet.create({
    workoutRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    container: {
        flex: 1,
        backgroundColor: '#171717',
        padding: 27,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
        paddingVertical: 10,
        marginBottom: 45,
    },
    title: {
        fontFamily: 'roboto-bold',
        fontSize: 24,
        color: '#FFFFFF'
    },
    workouts: {
        flex: 1,
    },
    workoutsView: {
        gap: 25
    },
    workoutTitleText: {
        color: '#67F2D1',
        fontFamily: 'roboto-bold',
        fontSize: 20,
        marginBottom: 12,
    },
    workoutCard: {
        backgroundColor: '#FFFFFF1A',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#67F2D199',
        padding: 14,
        paddingVertical: 12,
        gap: 12
    },
    workoutRowTitle: {
        fontFamily: 'roboto-bold',
        fontSize: 18,
        color: '#FFFFFF',
        marginRight: 10,
    },
    workoutRowText: {
        color: '#CBCBCB',
        fontFamily: 'roboto-bold',
        fontSize: 16,
    }
});