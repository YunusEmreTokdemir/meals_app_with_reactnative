import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { getUserRole, getCurrentUserId, signOutUser } from './firebaseConfig';
import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import FavoritesContextProvider from './store/context/favorites-context';
import Colors from './constant/color';
import LoginScreen from './screens/Auth/LoginScreen';
import SignupScreen from './screens/Auth/SignupScreen';
import AddMealScreen from './screens/AddMealScreen';
import DeleteMealScreen from './screens/DeleteMealScreen';
import AddCategoriesScreen from './screens/AddCategoriesScreen';
import DeleteCategoryScreen from './screens/DeleteCategoriesScreen';
import SearchScreen from './screens/SearchScreen';
import UpdateMealScreen from './screens/UpdateMealScreen';
import UpdateCategoryScreen from './screens/UpdateCategoryScreen';
import RecommendationsScreen from './screens/RecommendationsScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const handleSignOut = async () => {
    try {
      await signOutUser();
      props.navigation.navigate('Login'); 
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <DrawerContentScrollView 
      {...props} 
      style={{ backgroundColor: Colors.primary500 }}
    >
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sign Out"
        onPress={handleSignOut}
        icon={({ color, size }) => (
          <Ionicons name="log-out" color={Colors.primary700} size={size} />
        )}
        labelStyle={{ color: Colors.primary700 }}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const userId = getCurrentUserId();
      if (userId) {
        const role = await getUserRole(userId);
        setUserRole(role);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: Colors.primary700,
        sceneContainerStyle: { backgroundColor: Colors.primary600 },
        drawerContentStyle: { backgroundColor: Colors.primary500 },
        drawerActiveTintColor: Colors.primary700,
        drawerInactiveTintColor: Colors.primary700,
        drawerActiveBackgroundColor: Colors.primary600,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'Meal Categories',
          drawerIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          drawerIcon: ({ color, size }) => <Ionicons name="star" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Recommendations"
        component={RecommendationsScreen}
        options={{
          title: 'Recommendations',
          drawerIcon: ({color, size}) => <Ionicons name='heart' color={color} size={size}/>,
        }}
      />
      <Drawer.Screen
        name='SearchScreen'
        component={SearchScreen}
        options={{
          title : 'Search Meal',
          drawerIcon: ({color,size}) => <Ionicons name='search' color={color} size={size}/>,
        }}
      />
      {userRole === 'admin' && (
        <>
          <Drawer.Screen
            name="AddMeal"
            component={AddMealScreen}
            options={{
              title: 'Add New Meal',
              drawerIcon: ({ color, size }) => <Ionicons name="add" color={color} size={size} />,
            }}
          />
          <Drawer.Screen
            name="DeleteMeal"
            component={DeleteMealScreen}
            options={{
              title: 'Delete Meal',
              drawerIcon: ({ color, size }) => <Ionicons name="remove" color={color} size={size} />,
            }}
          />
          <Drawer.Screen
            name='AddCategoriesScreen'
            component={AddCategoriesScreen}
            options={{
              title: 'Add New Category',
              drawerIcon: ({color, size }) => <Ionicons name='add' color={color} size={size} />,
          }}
          />
          <Drawer.Screen
            name='DeleteCategoriesScreen'
            component={DeleteCategoryScreen}
            options={{
              title: 'Delete Category',
              drawerIcon: ({color, size}) => <Ionicons name='remove' color={color} size={size}/>,
            }}
          />
          <Drawer.Screen 
          name='UpdateMealScreen'
          component={UpdateMealScreen}
          options={{
            title: 'Update Meal',
            drawerIcon: ({color, size}) => <Ionicons name='create' color={color} size={size}/>,
          }}
          />
          <Drawer.Screen
          name='UpdateCategoryScreen'
          component={UpdateCategoryScreen}
          options={{
            title: 'Update Category',
            drawerIcon: ({color, size}) => <Ionicons name='create' color={color} size={size}/>,
          }}
          />
        </>
        
      )}
    </Drawer.Navigator>
  );
};


export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <FavoritesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: Colors.primary500 },
              headerTintColor: Colors.primary700,
              contentStyle: { backgroundColor: Colors.primary600 },
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
            <Stack.Screen name="Register" component={SignupScreen} options={{ title: 'Sign Up' }} />
            <Stack.Screen
              name="MealsCategories"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
            <Stack.Screen
              name="MealDetail"
              component={MealDetailScreen}
              options={{ title: 'About the Meal' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesContextProvider>
    </>
  );
}
