import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons, AntDesign, Feather} from '@expo/vector-icons';

import RegistrationScreen from './screens/auth/RegistrationScreen';
import LoginScreen from './screens/auth/LoginScreen';
import ProfileScreen from "./screens/main/ProfileScreen";
import CreatePostsScreen from "./screens/main/CreatePostsScreen";
import PostsScreen from "./screens/main/PostsScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) =>
{
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Registration" >
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }} />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} />
      </AuthStack.Navigator>
    )
  }
  return (
      <MainTab.Navigator
          screenOptions={{
              tabBarShowLabel: false,
              headerStyle: {
                  height: 88,
                  shadowColor: "#0000004D",
                  shadowOpacity: 0.5 }
          }} >
          <MainTab.Screen
              name='Posts'
              component={PostsScreen}
                options={{
                    tabBarIcon: ({focused, size, color}) => (
                        <Ionicons name="grid-outline" size={size} color='#212121CC' />
                    ),
                    // headerBackTitle: 'hello',
                }}
              />
          <MainTab.Screen
              name='Create'
              component={CreatePostsScreen}
                options={{
                    tabBarIcon: ({ focused, size, color }) => (
                        <AntDesign name="plus" size={13} color="#FFFFFF"
                            backgroundColor={"#FF6C00"} 
                        />
                    ),
                // tabBarActiveTintColor:,
                headerShown: false,
                }}
            //   tabBarBadgeStyle={{color:"#FF6C00"}}
        />
          <MainTab.Screen
              name='Profile'
              component={ProfileScreen} 
                options={{
                    tabBarIcon: ({focused, size, color}) => (
                        <Feather name="user" size={size} color='#212121CC' />
                    ),
                }}
              />
      </MainTab.Navigator>
  )
}