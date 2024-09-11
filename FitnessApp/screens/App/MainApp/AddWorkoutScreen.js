import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import xIcon from "../../../assets/icons/x-icon";
import IconShare from "../../../components/ui/Icon";

function DropDown({ data, selected, index, dKey, dropdownChange }) {
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: '#67F2D1', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }]}
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
                activeColor="#444F4C"
                itemTextStyle={{ color: '#FFFFFF' }}
                selectedTextProps={{ borderColor: 'red' }}
            />
        </View>
    );
}

function AddWorkoutScreen({ navigation }) {
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
                    <View style={styles.newWorkoutDay}>
                        <Text style={styles.newWorkoutDayText}>Day</Text>
                        <View style={styles.newWorkoutDayDropdown}>
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
                    </View>
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
    newWorkoutDay: {
        marginTop: 43,
    },
    newWorkoutDayText: {
        fontFamily: 'roboto-medium',
        fontSize: 16,
        color: '#FFFFFF',
    }
});