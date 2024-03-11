import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { deleteMealByName } from '../firebaseConfig'; // Yeni eklediğiniz fonksiyonu içe aktarın

import Colors from '../constant/color';

const DeleteMealScreen = () => {
  const [mealName, setMealName] = useState(''); // Yemek ismini tutacak state

  const handleDeleteMealByName = async () => {
    if (!mealName) {
      alert('Please enter the name of the dish you want to delete.');
      return;
    }

    try {
      const deletedCount = await deleteMealByName(mealName); // Yemeği ismine göre sil
      if (deletedCount > 0) {
        alert(`${deletedCount} piece '${mealName}' The named dish has been deleted successfully!`);
      } else {
        alert('No food found to delete.');
      }
      setMealName(''); // TextInput'u temizle
    } catch (error) {
      alert('An error occurred while deleting a meal: ' + error.message);
    }
  };

  return (
    <ScrollView style={styles.form}>
      <View style={styles.formControl}>
        <Text style={styles.label}>Meals Name</Text>
        <TextInput
          style={styles.input}
          value={mealName}
          onChangeText={setMealName}
          placeholder="Enter the name of the dish you want to delete."
        />
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleDeleteMealByName} activeOpacity={0.7}>
        <Text style={styles.buttonText}>DELETE MEAL</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


export default DeleteMealScreen;

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
        switchContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
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
