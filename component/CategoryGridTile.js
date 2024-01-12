
import { Pressable, View, Text, StyleSheet, Platform,ImageBackground } from 'react-native';


function CategoryGridTile({title, onPress, imageUrl}) { 
    return ( 
    <View style={styles.gridItem}>
        <Pressable 
            android_ripple={{color: '#ccc'}} 
            style={({pressed}) => [styles.button, 
            pressed ? styles.buttonPressed : null
        ]}
        onPress={onPress}
            >
            <ImageBackground 
            source={{uri: imageUrl}} 
            style={styles.bgimage} >
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </ImageBackground>
        </Pressable>
    </View>
    );
}

export default CategoryGridTile;

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 8,
        elevation: 4,
        shadowColor: "2E7D32",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === "android" ? "hidden" : "visible",
    },
    button : {
        flex: 1,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    innerContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 16,
    }, 
    title: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white",
    },
    bgimage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        overflow: 'hidden',
      },
});


