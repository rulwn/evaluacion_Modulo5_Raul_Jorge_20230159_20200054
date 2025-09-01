import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthContext';

// Pantallas de autenticación
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Pantallas principales
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

// Pantallas de productos (las originales)
import Home from '../screens/Home';
import Add from '../screens/Add';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Navegador de tabs para usuarios autenticados
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = 'home';
          } else if (route.name === 'ProductsTab') {
            iconName = 'inventory';
          } else if (route.name === 'ProfileTab') {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0288d1',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{ title: 'Inicio' }} 
      />
      <Tab.Screen 
        name="ProductsTab" 
        component={ProductsStackNavigator} 
        options={{ title: 'Productos' }} 
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileStackNavigator} 
        options={{ title: 'Perfil' }} 
      />
    </Tab.Navigator>
  );
};

// Stack navigator para la sección de productos
const ProductsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Products" 
        component={Home} 
        options={{ title: 'Productos' }} 
      />
      <Stack.Screen 
        name="Add" 
        component={Add} 
        options={{ 
          presentation: 'modal', 
          title: 'Agregar Producto' 
        }} 
      />
    </Stack.Navigator>
  );
};

// Stack navigator para el perfil
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Mi Perfil' }} 
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen} 
        options={{ 
          title: 'Editar Perfil',
          presentation: 'modal'
        }} 
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Stack de autenticación
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // Stack de usuario autenticado
          <Stack.Screen name="Main" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;