import React, { useState, useEffect } from 'react';
import { FlatList } from "react-native";
import CategoryGridTile from "../component/CategoryGridTile";
import { fetchCategories } from "../firebaseConfig";

function CategoriesScreen({ navigation }) {
    const [categories, setCategories] = useState([]); // State to hold categories

    useEffect(() => {
        // Fetch categories when the component mounts
        fetchCategories().then(fetchedCategories => {
            setCategories(fetchedCategories); // Set fetched categories to state
        }).catch(error => {
            console.error("Failed to fetch categories:", error);
        });
    }, []); // The empty array ensures this effect runs only once after initial render

    function renderCategoryItem(itemData) {
        function pressHandler() {
            navigation.navigate('MealsOverview', {
                categoryId: itemData.item.id,
            });
        }

        return (
            <CategoryGridTile 
                title={itemData.item.title} 
                imageUrl={itemData.item.imageUrl}
                onPress={pressHandler}
            />
        );
    }

    return (
        <FlatList
            data={categories} // Use state variable here instead of dummy data
            keyExtractor={(item) => item.id} 
            renderItem={renderCategoryItem}
            numColumns={2}
        />
    );
}

export default CategoriesScreen;
