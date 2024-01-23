import React, { useLayoutEffect, useState, useEffect, useContext } from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';

import MealDetails from '../component/MealDetails';
import Subtitle from '../component/MealDetail/Subtitle';
import List from '../component/MealDetail/List';
import IconButton from '../component/IconButton';
import { FavoritesContext } from '../store/context/favorites-context';
import Colors from '../constant/color';

import { fetchMeals, fetchUserFavorites, addFavoriteMeal, removeFavoriteMeal, getCurrentUserId } from '../firebaseConfig';


function MealDetailScreen({route, navigation}) {
    const [selectedMeal, setSelectedMeal] = useState();
    const [mealsIsFavorite, setMealsIsFavorite] = useState(false); // Added this line
    const favoriteMealsCtx = useContext(FavoritesContext);
    

    const mealId = route.params.mealId;

    const userId = getCurrentUserId(); // Get the current user's ID


    useEffect(() => {
        const fetchMealAndFavorites = async () => {
          const allMeals = await fetchMeals();
          const meal = allMeals.find((m) => m.id === mealId);
          setSelectedMeal(meal);
    
          // Kullanıcının favori yemeklerini çek (Örnek userId: "user123")
          const userFavorites = await fetchUserFavorites(userId);
          setMealsIsFavorite(userFavorites.includes(mealId));
        };
    
        fetchMealAndFavorites();
      }, [mealId, userId]);
      
    


    const changeFavoriteStatusHandler = async () => {
        if (mealsIsFavorite) {
          await removeFavoriteMeal(userId, mealId); // Örnek userId: "user123"
        } else {
          await addFavoriteMeal(userId, mealId);
        }
        setMealsIsFavorite(!mealsIsFavorite);
      };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton 
                    icon={mealsIsFavorite ? "star" : "star-outline"} 
                    color={Colors.primary600}
                    onPress={changeFavoriteStatusHandler}
                />;
            }
        });
    }, [navigation, mealsIsFavorite, changeFavoriteStatusHandler]);

    if (!selectedMeal) {
        // Eğer yemek bilgisi henüz yüklenmediyse bir yükleniyor göstergesi göster
        return <Text>Yükleniyor...</Text>;
    }

    return (
        <ScrollView style={styles.rootContainer}>
            <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }}/>
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealDetails 
                duration={selectedMeal.duration} 
                complexity={selectedMeal.complexity}
                affordability={selectedMeal.affordability}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectedMeal.ingredients}/>
                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps}/>
                </View>
            </View>
        </ScrollView>
    );
}

export default MealDetailScreen;

// Stilleriniz aynı kalacak...


const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32,
    },
    image: {
        width: "90%",
        height: 300,
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 16,
        marginHorizontal: 16,
        alignSelf: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        margin: 8,
        textAlign: "center",
        color: Colors.primary500,
    },
    detailText: {
        color: Colors.primary500,
    },
    listOuterContainer: {
        alignItems: "center",
    },
    listContainer: {
        width: "80%",
    }
});