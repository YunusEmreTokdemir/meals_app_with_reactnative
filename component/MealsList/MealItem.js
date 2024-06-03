import React from 'react';
import { View, Text, Pressable, Image, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MealDetails from "../MealDetails";
import Colors from "../../constant/color";

function MealItem({ 
  id, 
  title,
  imageUrl, 
  duration, 
  complexity, 
  affordability
}) {
  const navigation = useNavigation();

  const selectMealItemHandler = () => {
    navigation.navigate('MealDetail', {
      mealId: id,
    });
  };
  
  return (
    <View style={styles.mealItem}>
      <Pressable 
        android_ripple={{color: Colors.primary700}} 
        style={({pressed}) => pressed ? styles.buttonPressed : null}
        onPress={selectMealItemHandler}
      >
        <View style={styles.innerContainer}>
          <Image source={{uri: imageUrl}} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
          <MealDetails 
            duration={duration} 
            affordability={affordability} 
            complexity={complexity}
          />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",        
    backgroundColor: Colors.primary500,
    elevation: 4,
    shadowColor: Colors.primary600,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height:  2 },
    shadowRadius: 16,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    color: Colors.primary700,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
});

export default MealItem;
