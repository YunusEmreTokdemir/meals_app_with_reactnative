// MealDetails.js
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constant/color';

function MealDetails({ duration, complexity, affordability, style, textStyle }) {
    return (
        <View style={[styles.details, style]}>
            <Text style={[styles.detailsItem, textStyle]}>{duration}m</Text>
            <Text style={[styles.detailsItem, textStyle]}>{complexity?.toUpperCase() || 'N/A'}</Text>
            <Text style={[styles.detailsItem, textStyle]}>{affordability?.toUpperCase() || 'N/A'}</Text>
        </View>
    );
}

export default MealDetails;

const styles = StyleSheet.create({
    details: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
    },
    detailsItem: {
        marginHorizontal: 4,
        fontSize: 12,
        color: Colors.primary700,
    }
});
