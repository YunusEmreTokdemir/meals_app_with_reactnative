import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';

import MealsList from '../component/MealsList/MealsList';
import { MEALS } from '../data/dummy-data';
import { FavoritesContext } from '../store/context/favorites-context';

function FavoritesScreen() {
  const favoriteMealCtx = useContext(FavoritesContext);

  const favoriteMeals = MEALS.filter((meal) => 
    favoriteMealCtx.ids.includes(meal.id));

    if (favoriteMeals.length === 0 || !favoriteMeals) {
      return (
        <View style = {styles.rootContainer}>
          <Text style ={styles.textContainer}>No favorite meals found. Start adding some!</Text>
        </View>
      );
    }

  return <MealsList items={favoriteMeals}/>
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
    color: '#034f12',
  }
});