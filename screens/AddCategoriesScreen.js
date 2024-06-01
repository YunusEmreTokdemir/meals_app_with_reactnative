import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { addCategory } from '../firebaseConfig'; // ensure this is imported correctly
import { useNavigation } from '@react-navigation/native'; // Add this line if not already imported

import Colors from '../constant/color';

const AddCategoryScreen = () => {
  const [category, setCategory] = useState({
    title: '', // Ensure this matches your Firebase field
    imageUrl: '', // Ensure this matches your Firebase field
  });

  const navigation = useNavigation(); // Add this line

  const handleSubmit = async () => {
    try {
      await addCategory({
        title: category.title,
        imageUrl: category.imageUrl
      });
      Alert.alert('Başarılı', 'Kategori başarıyla eklendi!');
      navigation.goBack(); // Önceki ekrana geri dön (muhtemelen kategori listesine)
    } catch (error) {
      Alert.alert('Hata', 'Kategori eklenirken hata oluştu: ' + error.message);
    }
  };
  
  return (
    <ScrollView style={styles.form}>
      {/* Category name input */}
      <View style={styles.formControl}>
        <Text style={styles.label}>Category Name</Text>
        <TextInput
          style={styles.input}
          value={category.title}
          onChangeText={(text) => setCategory({ ...category, title: text })}
        />
      </View>
      
      {/* Category image URL input */}
      <View style={styles.formControl}>
        <Text style={styles.label}>Category Image URL</Text>
        <TextInput
          style={styles.input}
          value={category.imageUrl}
          onChangeText={(text) => setCategory({ ...category, imageUrl: text })}
        />
      </View>

      {/* Submit button */}
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit} activeOpacity={0.7}>
        <Text style={styles.buttonText}>ADD CATEGORY</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddCategoryScreen;


const styles = StyleSheet.create({
  form: {
    margin: 15,
  },
  formControl: {
    marginBottom: 10,
  },
  label: {
    marginVertical: 6,
    color: Colors.primary500,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 8,
    borderBottomColor: Colors.primary500,
    borderBottomWidth: 1,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: Colors.primary500,
    width: '100%',
    padding: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.primary700,
    fontSize: 16,
  },
});
