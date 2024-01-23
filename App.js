import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';


import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import FavoritesContextProvider from './store/context/favorites-context';
import Colors from './constant/color';
import LoginScreen from './screens/Auth/LoginScreen';
import SignupScreen from './screens/Auth/SignupScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();




function DrawerNavigator() {
  return (
    <Drawer.Navigator 
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500}, // categoriler üst sınır rengi
        headerTintColor: Colors.primary700, // categoriler üst sınır yazı rengi
        sceneContainerStyle: {backgroundColor: Colors.primary600}, // categoriler arka plan rengi
        drawerContentStyle: {backgroundColor: Colors.primary500}, // drawer arka plan rengi
        drawerActiveTintColor: Colors.primary700, // drawer mealcategories yazı rengi
        drawerInactiveTintColor: Colors.primary700, // drawer favorites yazı rengi
        drawerActiveBackgroundColor: Colors.primary600, // drawer yazı arka plan rengi
      }} 
    >
      <Drawer.Screen 
        name='Categories' 
        component={CategoriesScreen} 
        options={{
          title: 'Meal Categories',
          drawerIcon: ({color, size}) => 
            <Ionicons name='list' color={color} size={size} />,
        }}
      />
      <Drawer.Screen 
        name='Favorites' 
        component={FavoritesScreen} 
        options={{
          drawerIcon: ({color, size}) => 
            <Ionicons name='star' color={color} size={size} />,
      }}
      />
    </Drawer.Navigator>
    );
}

export default function App() {
  
  return (
    <>
      <StatusBar style="light" />
      <FavoritesContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500}, //mealsoverview üst sınır rengi
            headerTintColor: Colors.primary700, //mealsoverview üst sınır yazı rengi
            contentStyle: {backgroundColor: Colors.primary600}, //mealsoverview arka plan rengi
          }}
        >
          <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{
            title: 'Login',
          }}
          />
          <Stack.Screen
          name='Register'
          component={SignupScreen}
          options={{
            title: 'Sign Up',
          }}
          />
        
          <Stack.Screen 
           name="MealsCategories" 
           component={DrawerNavigator}
           options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="MealsOverview" 
            color={Colors.primary700}
            component={MealsOverviewScreen} 
          />
          <Stack.Screen 
            name='MealDetail'
            component={MealDetailScreen} 
            options={{
              
              title: 'About the Meal',
          }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
      </FavoritesContextProvider>
    </>
    
  );
}
