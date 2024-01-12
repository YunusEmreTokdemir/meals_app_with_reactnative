import { FlatList } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../component/CategoryGridTile";

function CategoriesScreen({navigation}) {
    function renderCategoryItem(itemData) {
    function pressHandler() {
        navigation.navigate('MealsOverview',{
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
        data = {CATEGORIES} 
        keyExtractor={(item) => item.id} 
        renderItem={renderCategoryItem}
        numColumns={2}
    >
    </FlatList>
    );
}

export default CategoriesScreen;

