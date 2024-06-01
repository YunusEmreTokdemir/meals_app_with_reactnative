import React, { useState, useEffect, useLayoutEffect } from 'react';
import { FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import CategoryGridTile from "../component/CategoryGridTile";
import { fetchCategories } from "../firebaseConfig";
import Colors from '../constant/color';

function CategoriesScreen({ navigation }) {
    const [categories, setCategories] = useState([]);

    const fetchAndSetCategories = async () => {
        try {
            const fetchedCategories = await fetchCategories();
            setCategories(fetchedCategories);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        fetchAndSetCategories();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchAndSetCategories);
        return unsubscribe;
    }, [navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity 
                    style={styles.searchButton}
                    onPress={() => {
                        // 'Drawer' ile 'SearchScreen' navigasyonunu tetikleyin
                        if (navigation.getParent()) {
                            // getParent fonksiyonu ile üst navigator'a erişip oradan navigate çağrısını yapın
                            navigation.getParent().navigate('SearchScreen');
                        } else {
                            // Alternatif olarak doğrudan navigate çağrısı yapabilirsiniz
                            navigation.navigate('SearchScreen');
                        }
                    }}
                >
                    <Ionicons name="search" size={24} color={Colors.primary700} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);
      

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
            data={categories}
            keyExtractor={(item) => item.id} 
            renderItem={renderCategoryItem}
            numColumns={2}
        />
    );
}

export default CategoriesScreen;

const styles = StyleSheet.create({
    searchButton: {
        marginRight: 10, 
    },
});