import React from "react";
//native
import { NavigationContainer } from "@react-navigation/native";
//stack
import { createStackNavigator } from "@react-navigation/stack";
//
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//initial navigation
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "native-base";
import Home from "./src/screens/todolist";
import TodoList from "./src/screens/todolist";
import DetailTodo from "./src/screens/detailTodo";
import History from "./src/screens/history";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function MyTab() {
  const theme = useTheme();
  return (
    <Tab.Navigator 
      initialRouteName="TodoList"
      screenOptions={({ route }) => ({
        headerMode: "Screen",
        headerTintColor: "white",
        headerStyle: { backgroundColor: theme.colors.primary["500"] },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Todo") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Finished") {
            iconName = focused ? "menu" : "menu";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary["800"],
        tabBarInactiveTintColor: "gray",
      })}
    >
      
      <Tab.Screen name="Todo" component={Home} />
      <Tab.Screen name="Finished" component={History} />
    </Tab.Navigator>
  );
}

export default function Container() {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MyTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ToDo"
          component={TodoList}
          options={{
            title: "Todo",
            headerMode: "screen",
            headerTintColor: "white",
            headerShown: false,
            headerStyle: { backgroundColor: "#A20512" },
          }}
        />
        <Stack.Screen
          name="Finished"
          component={History}
          options={{
            title: "Finished",
            headerMode: "screen",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#A20512" },
          }}
        />
        <Stack.Screen
          name="DetailTodo"
          component={DetailTodo}
          options={{
            title: "Finished",
            headerMode: "screen",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#A20512" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ); //   Use Screen
}
