import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import app from '../../firebaseConfig'; // Firebase projenizi başlattığınız dosya
import { login } from '../../firebaseConfig';


import Colors from '../../constant/color';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logoUrl = 'https://images.squarespace-cdn.com/content/v1/517636f8e4b0cb4f8c8697ba/1537801205388-RA24NUQ6E59HB7INOD97/shutterstock_132337193.jpg';

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.navigate('MealsCategories');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'Kullanıcı bulunamadı');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Image source={{ uri: logoUrl }} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="E-Mail"
        placeholderTextColor={Colors.primary500}
        value={email}
        onChangeText={setEmail}
        defaultValue='ytokdemir155@gmail.com'
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={Colors.primary500}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        defaultValue='123456'
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary500, // Arka plan rengi
  },
  logo: {
    width: 250, // Resmin genişliği
    height: 250, // Resmin yüksekliği
    marginBottom: 20, // Altındaki alanlara boşluk
    borderRadius: 15, // Resim köşelerini yuvarlak yap
    alignItems: 'center', // İçerik yatayda ortala
    resizeMode: 'contain', // Resmi tamamen sığdır
  },
  input: {
    width: '75%',
    height: 40,
    borderColor: Colors.primary600, 
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary600,
  },
  button: {
    marginTop: 20,
    backgroundColor: Colors.primary600, // Buton arka plan rengi
    width: '75%', // Buton genişliği
    height: 40, // Buton yüksekliği
    justifyContent: 'center', // İçerik dikeyde ortala
    alignItems: 'center', // İçerik yatayda ortala
    borderRadius: 5, // Kenar yuvarlaklığı
  },
  buttonText: {
    color: Colors.primary500, // Metin rengi
    fontSize: 16, // Metin boyutu
  },
});
