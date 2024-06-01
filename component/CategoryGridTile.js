import { Pressable, View, Text, StyleSheet, Platform, ImageBackground } from 'react-native';
import Colors from '../constant/color';

function CategoryGridTile({ title, onPress, imageUrl }) {
    return (
        <View style={styles.gridItem}>
            <Pressable
                android_ripple={{ color: Colors.primary600 }}
                style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
                onPress={onPress}
            >
                <ImageBackground
                    source={{ uri: imageUrl }}
                    style={styles.bgimage}
                >
                    {/* Kategori adının görüneceği paneli ekleyin */}
                    <View style={styles.titleContainer}>
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
        shadowColor: Colors.primary500,
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
    bgimage: {
        flex: 1,
        justifyContent: 'flex-end', // Kategori adını altta göstermek için
    },
    titleContainer: {
        position: 'absolute', // Metni arka plan üzerine yerleştirmek için
        bottom: 0, // En alta yerleştirin
        left: 0, // Sol kenara hizalayın
        right: 0, // Sağ kenara hizalayın
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Şeffaf siyah bir arka plan
        paddingVertical: 8, // Dikey padding ekleyin
        paddingHorizontal: 16, // Yatay padding ekleyin
        alignItems: 'center', // Metni yatay olarak ortala
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        color: Colors.primary700, // Beyaz renk metin
        textAlign: 'center',
    },
});


