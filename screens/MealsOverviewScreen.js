import React, { useLayoutEffect, useState, useEffect } from 'react';
import MealList from '../component/MealsList/MealsList';
import { fetchMeals } from '../firebaseConfig'; // fetchMeals fonksiyonunu içe aktar

function MealsOverviewScreen({ route, navigation }) {
    const [displayedMeals, setDisplayedMeals] = useState([]);
    const [categoryTitle, setCategoryTitle] = useState('');
    const catId = route.params.categoryId;

    useEffect(() => {
        // Kategoriye ait yemekleri çek
        const fetchMealsForCategory = async () => {
            const allMeals = await fetchMeals(); // fetchMeals fonksiyonunu kullan
            const filteredMeals = allMeals.filter((meal) => meal.categoryIds.includes(catId));
            setDisplayedMeals(filteredMeals);

            // Aynı zamanda kategori başlığını çekmek için başka bir fonksiyon çağırabilirsiniz
            // veya başka bir yerde çekilen kategorileri kullanabilirsiniz.
            // ...
        };

        fetchMealsForCategory();
    }, [catId]);

    useLayoutEffect(() => {
        // Kategori başlığını ayarlayan kod buraya...
        // Örneğin, kategorileri context'ten veya bir üst bileşenden prop olarak alabilirsiniz
    }, [catId, navigation, categoryTitle]);

    return (
        <MealList items={displayedMeals} navigation={navigation} />
    );
}

export default MealsOverviewScreen;
