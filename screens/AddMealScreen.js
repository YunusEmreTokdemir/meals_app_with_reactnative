import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { addNewMeal } from '../firebaseConfig';

import Colors from '../constant/color';

const AddMealScreen = () => {
  const [meal, setMeal] = useState({
    title: '',
    categoryIds: '',
    ingredients: '',
    steps: '',
    duration: '',
    complexity: '',
    affordability: '',
    imageUrl: '',
    isGlutenFree: false,
    isVegan: false,
    isVegetarian: false,
    isLactoseFree: false,
  });

  const handleSubmit = async () => {
    try {
      const formattedMeal = {
        ...meal, 
        categoryIds: meal.categoryIds.split(',').map(id => id.trim()),
        ingredients: meal.ingredients.split(',').map(ingredient => ingredient.trim()),
        steps: meal.steps.split(',').map(step => step.trim()),
        duration: parseInt(meal.duration, 10),
      };
      await addNewMeal(formattedMeal);
      alert('Yemek başarıyla eklendi!');
    } catch (error) {
      alert('Yemek eklerken bir hata oluştu: ' + error.message);
    }
  };

  return (
    <ScrollView style={styles.form}>
      <View style={styles.formControl}>
        <Text style={styles.label}>Meals name</Text>
        <TextInput
          style={styles.input}
          value={meal.title}
          onChangeText={(text) => setMeal({ ...meal, title: text })}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Category ID & ID's (Separate with Comma)</Text>
        <TextInput
          style={styles.input}
          value={meal.categoryIds}
          onChangeText={(text) => setMeal({ ...meal, categoryIds: text })}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Image URL</Text>
        <TextInput
          style={styles.input}
          value={meal.imageUrl}
          onChangeText={(text) => setMeal({ ...meal, imageUrl: text })}
        />
      </View>
      <View>
        <Text style={styles.label}>Steps</Text>
        <TextInput
          style={styles.input}
          value={meal.steps}
          onChangeText={(text) => setMeal({ ...meal, steps: text })}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Ingredients(Separate with Comma)</Text>
        <TextInput
          style={styles.input}
          value={meal.ingredients}
          onChangeText={(text) => setMeal({ ...meal, ingredients: text })}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Duration</Text>
        <TextInput
          style={styles.input}
          value={meal.duration}
          onChangeText={(text) => setMeal({ ...meal, duration: text })}
        />
      </View>
      <View>
        <Text style={styles.label}>Complexity</Text>
        <TextInput
          style={styles.input}
          value={meal.complexity}
          onChangeText={(text) => setMeal({ ...meal, complexity: text })}
        />
      </View>
      <View>
        <Text style={styles.label}>Affordability</Text>
        <TextInput
          style={styles.input}
          value={meal.affordability}
          onChangeText={(text) => setMeal({ ...meal, affordability: text })}
        />
      </View>
      
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit} activeOpacity={0.7}>
        <Text style={styles.buttonText}>ADD MEALS</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddMealScreen;

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
