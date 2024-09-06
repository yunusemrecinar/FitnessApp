import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SixDigitInput = ({ code, setCode }) => {
    const inputRef = useRef(null);

    // Automatically focus on input when the component mounts
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    // Handles the input change, ensuring only numbers are entered and max length is 6
    const handleChange = (text) => {
        if (/^\d*$/.test(text) && text.length <= 6) {
            setCode(text);
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRef.current.focus()}
            style={styles.container}
        >
            <View style={styles.inputContainer}>
                {Array(6).fill().map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.inputBox,
                            code.length === index && styles.activeBox,  // Highlight the current box
                            code.length > index && styles.filledBox    // Mark filled boxes
                        ]}
                    >
                        <Text style={styles.inputText}>{code[index] || ''}</Text>
                    </View>
                ))}
                <TextInput
                    ref={inputRef}
                    value={code}
                    onChangeText={handleChange}
                    keyboardType="numeric"
                    maxLength={6}
                    style={styles.hiddenInput}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 38
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
    },
    inputBox: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#D4D4D44D',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D4D4D44D',
    },
    filledBox: {
        borderColor: '#67F2D1',
    },
    activeBox: {
        borderColor: '#67F2D1',
        borderWidth: 2, // Thicker border for the active box
    },
    inputText: {
        fontSize: 18,
        color: '#FFF',
        fontFamily: 'baloo-regular',
    },
    hiddenInput: {
        position: 'absolute',
        opacity: 0,
    },
});

export default SixDigitInput;
