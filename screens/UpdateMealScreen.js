import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native';
import { updateMealByName } from '../firebaseConfig';
import Colors from '../constant/color';


const UpdateMealScreen = ({ navigation }) => {
  const [mealName, setMealName] = useState('');
  const [mealDetails, setMealDetails] = useState({
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
    // Verileri doğru formatta hazırla
    const formattedMealDetails = {
      // ...mealDetails,
      categoryIds: mealDetails.categoryIds.split(',').map(id => id.trim()),
      ingredients: mealDetails.ingredients.split(',').map(ingredient => ingredient.trim()),
      steps: mealDetails.steps.split(',').map(step => step.trim()),
      duration: mealDetails.duration,
      complexity: mealDetails.complexity,
      affordability: mealDetails.affordability,
      imageUrl: mealDetails.imageUrl,
      isGlutenFree: mealDetails.isGlutenFree,
      isVegan: mealDetails.isVegan,
      isVegetarian: mealDetails.isVegetarian,
      isLactoseFree: mealDetails.isLactoseFree,
      // Diğer alanlarınızı burada düzenleyin
    };

    // Update meal by name
    const updated = await updateMealByName(mealName, formattedMealDetails);
    if(updated) {
      Alert.alert('Success', 'Meal successfully updated!');
      navigation.goBack();
    } else {
      Alert.alert('Error', 'No meal found with that name to update.');
    }
  };

  return (
    <ScrollView style={styles.form}>
      {/* Meal Name Input */}
      <View style={styles.formControl}>
        <Text style={styles.label}>Meal Name</Text>
        <TextInput
          style={styles.input}
          value={mealName}
          onChangeText={setMealName}
          placeholder="Enter meal name"
        />
      </View>
      {/* Category IDs Input */}
      <View style={styles.formControl}>
        <Text style={styles.label}>Category IDs (Comma separated)</Text>
        <TextInput
          style={styles.input}
          value={mealDetails.categoryIds}
          onChangeText={(text) => setMealDetails({ ...mealDetails, categoryIds: text })}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Image URL</Text>
        <TextInput
          style={styles.input}
          value={mealDetails.imageUrl}
          onChangeText={(text) => setMealDetails({ ...mealDetails, imageUrl: text })}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Ingredients (Comma separated)</Text>
        <TextInput
          style={styles.input}
          value={mealDetails.ingredients}
          onChangeText={(text) => setMealDetails({ ...mealDetails, ingredients: text })}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Steps</Text>
        <TextInput
          style={styles.input}
          value={mealDetails.steps}
          onChangeText={(text) => setMealDetails({ ...mealDetails, steps: text })}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Duration</Text>
        <TextInput
          style={styles.input}
          value={mealDetails.duration}
          onChangeText={(text) => setMealDetails({ ...mealDetails, duration: text })}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Complexity</Text>
        <TextInput
          style={styles.input}
          value={mealDetails.complexity}
          onChangeText={(text) => setMealDetails({ ...mealDetails, complexity: text })}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Affordability</Text>
        <TextInput
          style={styles.input}
          value={mealDetails.affordability}
          onChangeText={(text) => setMealDetails({ ...mealDetails, affordability: text })}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Is Gluten Free</Text>
  <     Switch
          value={mealDetails.isGlutenFree}
          onValueChange={(value) => setMealDetails({ ...mealDetails, isGlutenFree: value })}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Is Vegan</Text>
        <Switch
          value={mealDetails.isVegan}
          onValueChange={(value) => setMealDetails({ ...mealDetails, isVegan: value })}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Is Vegetarian</Text>
        <Switch
          value={mealDetails.isVegetarian}
          onValueChange={(value) => setMealDetails({ ...mealDetails, isVegetarian: value })}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Is Lactose Free</Text>
        <Switch
          value={mealDetails.isLactoseFree}
          onValueChange={(value) => setMealDetails({ ...mealDetails, isLactoseFree: value })}
        />
      </View>
      
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit} activeOpacity={0.7}>
        <Text style={styles.buttonText}>UPDATE MEAL</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UpdateMealScreen;

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
