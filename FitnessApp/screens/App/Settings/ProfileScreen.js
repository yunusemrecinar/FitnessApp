import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import leftArrow from '../../../assets/icons/left-arrow';
import IconShare from '../../../components/ui/Icon';

const ProfileScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('Yunus Emre Cinar');
  const [email, setEmail] = useState('yunusemrecinar@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('+905301129238');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => { navigation.goBack(); }}
          style={styles.backButton} // Centering and styling for back button
        >
          <View style={styles.leftArrow}>
            <IconShare width={18} height={15} xmlData={leftArrow} />
          </View>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          editable={false}
          onChangeText={setFullName}
          placeholder="Enter your full name"
          placeholderTextColor="#888"
        />
        <Text style={styles.helperText}>Update your full name.</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          editable={false}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter your email"
          placeholderTextColor="#888"
        />
        <Text style={styles.helperText}>Update your email.</Text>
      </View>

      {/* Phone Number Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          editable={false}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeholder="Enter your phone number"
          placeholderTextColor="#888"
        />
        <Text style={styles.helperText}>Update your phone number.</Text>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    paddingVertical: 10,
    marginBottom: 96,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16, 
  },
  leftArrow: {
    backgroundColor: '#FFFFFF1A',
    borderWidth: 1,
    borderColor: '#D4D4D433',
    padding: 10,
    paddingVertical: 11.5,
    borderRadius: 25,
  },
  title: {
    fontFamily: 'roboto-bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  fieldContainer: {
    marginBottom: 30,
    position: 'relative'
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    zIndex: 99,
    top: 18,
    left: 15,
  },
  input: {
    backgroundColor: '#292929',
    color: 'white',
    fontSize: 16,
    padding: 15,
    paddingVertical: 18,
    borderRadius: 8,
    textAlign: 'right',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#D4D4D433',
  },
  helperText: {
    fontFamily: 'roboto-medium',
    color: '#888',
    fontSize: 16,
    lineHeight: 29,
    marginTop: 7,
  },
});

export default ProfileScreen;
