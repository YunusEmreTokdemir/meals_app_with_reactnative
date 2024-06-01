import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { updateCategoryByName } from '../firebaseConfig';
import Colors from '../constant/color';

const UpdateCategoryScreen = ({ navigation }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDetails, setCategoryDetails] = useState({
    imageUrl: ''
  });

  const handleSubmit = async () => {
    try {
      const updated = await updateCategoryByName(categoryName, categoryDetails);
      if(updated) {
        Alert.alert('Success', 'Category successfully updated!');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'No category found with that name to update.');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to update category: ${error.message}`);
    }
  };

  return (
    <ScrollView style={styles.form}>
      <View style={styles.formControl}>
        <Text style={styles.label}>Category Name</Text>
        <TextInput
          style={styles.input}
          value={categoryName}
          onChangeText={setCategoryName}
          placeholder="Enter category name"
        />
      </View>

      <View style={styles.formControl}>
        <Text style={styles.label}>Category Image URL</Text>
        <TextInput
          style={styles.input}
          value={categoryDetails.imageUrl}
          onChangeText={(text) => setCategoryDetails({ ...categoryDetails, imageUrl: text })}
          placeholder="Enter image URL"
        />
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit} activeOpacity={0.7}>
        <Text style={styles.buttonText}>UPDATE CATEGORY</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UpdateCategoryScreen;

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
