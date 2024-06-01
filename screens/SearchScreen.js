import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { searchMealsByName } from '../firebaseConfig';
import CategoryGridTile from '../component/CategoryGridTile';
import Colors from '../constant/color';

const SearchScreen = ({ navigation }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [meals, setMeals] = useState([]);

  const searchMeals = async () => {
    try {
      const foundMeals = await searchMealsByName(searchKeyword);
      setMeals(foundMeals);
    } catch (error) {
      console.error('Failed to search meals:', error);
    }
  };

  useEffect(() => {
    if (searchKeyword) {
      searchMeals();
    } else {
      setMeals([]);
    }
  }, [searchKeyword]);

  const renderMealItem = ({ item }) => {
    const pressHandler = () => {
      navigation.navigate('MealDetail', { mealId: item.id });
    };

    return (
      <CategoryGridTile
        title={item.title}
        imageUrl={item.imageUrl}
        onPress={pressHandler}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Meals"
          value={searchKeyword}
          onChangeText={setSearchKeyword}
        />
        <TouchableOpacity style={styles.button} onPress={searchMeals}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={meals}
        keyExtractor={item => item.id}
        renderItem={renderMealItem}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary600,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: Colors.primary500,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: Colors.primary700,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchScreen;
