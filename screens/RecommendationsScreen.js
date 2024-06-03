import React, { useState, useContext, useCallback } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import MealsList from '../component/MealsList/MealsList';
import Colors from '../constant/color';
import { getCurrentUserId, fetchUserFavoriteMeals, searchMealsByName } from '../firebaseConfig'; // searchMealsByName'i ekliyoruz
import { FavoritesContext } from '../store/context/favorites-context';

const RECOMMENDATIONS_API = 'http://192.168.110.212:3000/recommendations';

function RecommendationsScreen() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const favoriteMealCtx = useContext(FavoritesContext);

  const fetchRecommendations = async (favoriteMeals) => {
    setIsLoading(true);
    try {
      const recommendationsPromises = favoriteMeals.map(async (meal) => {
        const response = await axios.get(`${RECOMMENDATIONS_API}/${encodeURIComponent(meal.title)}`);
        return response.data;
      });
      const allRecommendations = await Promise.all(recommendationsPromises);
      
      const uniqueRecommendations = Array.from(new Set(allRecommendations.flat().map(meal => meal.meal)))
                                         .map(title => allRecommendations.flat().find(meal => meal.meal === title));
      
      // Veritabanından detayları alıyoruz
      const mealDetailsPromises = uniqueRecommendations.map(async (meal) => {
        const mealDetails = await searchMealsByName(meal.meal);
        return mealDetails[0]; // İlk sonucu alıyoruz
      });

      const detailedMeals = await Promise.all(mealDetailsPromises);
      
      setMeals(detailedMeals);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      const loadRecommendations = async () => {
        const userId = getCurrentUserId();
        if (!userId) {
          console.error("No user ID found");
          return;
        }
        const favoriteMeals = await fetchUserFavoriteMeals(userId);
        fetchRecommendations(favoriteMeals);
      };
      loadRecommendations();
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

  return <MealsList items={meals} />;
}

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

export default RecommendationsScreen;
