import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { deleteCategoryByName } from '../firebaseConfig'; // deleteCategoryByName fonksiyonunuzu burada içe aktarın

import Colors from '../constant/color';

const DeleteCategoryScreen = () => {
  const [categoryName, setCategoryName] = useState(''); // Silinecek kategorinin ismini tutacak state

  const handleDeleteCategoryByName = async () => {
    if (!categoryName) {
      alert('Please enter the name of the category you want to delete.');
      return;
    }

    try {
      const deletedCount = await deleteCategoryByName(categoryName); // Kategoriyi ismine göre sil
      if (deletedCount > 0) {
        alert(`${deletedCount} piece '${categoryName}' named category has been deleted successfully!`);
      } else {
        alert('No category found to delete.');
      }
      setCategoryName(''); // TextInput'u temizle
    } catch (error) {
      alert('An error occurred while deleting the category: ' + error.message);
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
          placeholder="Enter the name of the category you want to delete."
        />
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleDeleteCategoryByName} activeOpacity={0.7}>
        <Text style={styles.buttonText}>DELETE CATEGORY</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DeleteCategoryScreen;

const styles = StyleSheet.create({
  form: {
    margin: 15,
  },
  formControl: {
    marginBottom: 10,
  },
  label: {
    marginVertical: 4,
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
