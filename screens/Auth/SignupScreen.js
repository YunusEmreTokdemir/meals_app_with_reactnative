import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import Colors from '../../constant/color';
import { createUser } from '../../firebaseConfig';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const imageUrl = "https://images.squarespace-cdn.com/content/v1/517636f8e4b0cb4f8c8697ba/1537801205388-RA24NUQ6E59HB7INOD97/shutterstock_132337193.jpg";

  const handleSignUp = async () => {
    try {
      await createUser(email, password);
      Alert.alert('Success ✅', 'Account created successfully');
      navigation.navigate('MealsCategories');
    } catch (error) {
      Alert.alert('Error', error.message);
    }      
  };

  return (
    <View style={styles.container}>
      
      <Image source={{ uri: imageUrl }} style={styles.image} />
      
      <TextInput
        style={styles.input}
        placeholder="Name-Surname"
        placeholderTextColor={Colors.primary500}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="E-Mail"
        placeholderTextColor={Colors.primary500}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={Colors.primary500}  
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.primary500,
  },
  input: {
    width: '75%',
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary600,
    marginTop: 15,
    padding: 10,
    borderRadius: 7,
    backgroundColor: Colors.primary600,
  },
  button: {
    width: '75%',
    backgroundColor: Colors.primary600, // Butonun arka plan rengi
    padding: 15,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: Colors.primary500, // Buton metninin rengi
  },
  image: {
    width: 240, // Resimin genişliği
    height: 240, // Resimin yüksekliği
    marginBottom: 20, // Altındaki öğelere boşluk bırakmak için
    borderRadius: 15, // Resmi daire yapmak için
    resizeMode: 'contain', // Resmi tamamen kaplaması için
    alignItems: 'center', // Resmi yatayda ortalamak için
  },
});

export default SignupScreen;
