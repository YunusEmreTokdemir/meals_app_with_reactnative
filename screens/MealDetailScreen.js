import { useLayoutEffect } from 'react';
import { 
    Text,
    View,
    Image, 
    StyleSheet,
    ScrollView
} from 'react-native';

import { MEALS } from '../data/dummy-data';
import MealDetails from '../component/MealDetails';
import Subtitle from '../component/MealDetail/Subtitle';
import List from '../component/MealDetail/List';
import IconButton from '../component/IconButton';

function MealDetailScreen({route, navigation}) {
    const mealId = route.params.mealId;

    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    function headerButtonPressHandler() {
        console.log('Pressed');
    }

    useLayoutEffect(() =>{
        navigation.setOptions({
            headerRight : () => {
                return <IconButton icon = "star" 
                    color="white"
                    onPress={headerButtonPressHandler}/>
            }
        });
    }, [navigation, headerButtonPressHandler]);

    return (
        <ScrollView style= {styles.rootContainer}>
            <Image style = {styles.image} source={{uri: selectedMeal.imageUrl}}/>
            <Text style = {styles.title}>{selectedMeal.title}</Text>
            <MealDetails 
                duration={selectedMeal.duration} 
                complexity={selectedMeal.complexity}
                affordability={selectedMeal.affordability}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style = {styles.listContainer}>
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
        color: "white",
    },
    detailText: {
        color: "white",
    },
    listOuterContainer: {
        alignItems: "center",
    },
    listContainer: {
        width: "80%",
    }
});