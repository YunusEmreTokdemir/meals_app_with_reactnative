import { View, Text, StyleSheet } from 'react-native';

function Subtitle({children}) {
    return (
        <View style= {styles.subtitleConteiner}>
            <Text style={styles.subtitle} >{children}</Text>
        </View>
    );
}

export default Subtitle;

const styles = StyleSheet.create({
    subtitle:{
        color: "#A1887F",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitleConteiner: {
        padding: 6,
        margin: 6,
        marginHorizontal: 12,
        marginVertical: 4,
        borderBottomColor: "#034f12",
        borderBottomWidth: 2,
    }
});
