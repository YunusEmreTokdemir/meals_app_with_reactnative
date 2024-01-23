import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import MealsList from '../component/MealsList/MealsList';
import Colors from '../constant/color';
import { fetchMeals, fetchUserFavorites, getCurrentUserId } from '../firebaseConfig';
import { FavoritesContext } from '../store/context/favorites-context';

function FavoritesScreen() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const favoriteMealCtx = useContext(FavoritesContext);

  useEffect(() => {
    const loadMealsAndFavorites = async () => {
      setIsLoading(true);
      try {
        const userId = getCurrentUserId(); 
        if (!userId) {
          console.error("No user ID found");
          setIsLoading(false);
          return;
        }

        const fetchedMeals = await fetchMeals();
        const userFavoritesIds = await fetchUserFavorites(userId);

        const favoriteMeals = fetchedMeals.filter(meal => userFavoritesIds.includes(meal.id));
        setMeals(favoriteMeals);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMealsAndFavorites();
  }, [favoriteMealCtx.ids]);

  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.primary500} />;
  }

  if (meals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.textContainer}>No favorite meals found. Start adding some!</Text>
      </View>
    );
  }

  return <MealsList items={meals}/>
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary500,
  }
});
