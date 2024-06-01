import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import MealsList from '../component/MealsList/MealsList'; 
import Colors from '../constant/color';
import { fetchMeals, recommendMealsBasedOnFavorites, getCurrentUserId } from '../firebaseConfig';
import { FavoritesContext } from '../store/context/favorites-context';

function RecommendationsScreen() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const favoriteMealCtx = useContext(FavoritesContext);

  useFocusEffect(
    useCallback(() => {
      const loadMealsAndRecommendations = async () => {
        setIsLoading(true);
        try {
          const userId = getCurrentUserId(); 
          if (!userId) {
            console.error("No user ID found");
            setIsLoading(false);
            return;
          }

          const fetchedMeals = await fetchMeals();
          const recommendedMeals = await recommendMealsBasedOnFavorites(userId);

          setMeals(recommendedMeals);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      loadMealsAndRecommendations();
    }, [favoriteMealCtx.ids])
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.primary500} />;
  }

  if (meals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.textContainer}>No recommendations available. Check back later!</Text>
      </View>
    );
  }

  return <MealsList items={meals}/>;
}

export default RecommendationsScreen;

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
