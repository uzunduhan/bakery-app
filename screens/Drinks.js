import React from "react";
import COLORS from "../utils/COLORS";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HotDrinks from "./Drinks/HotDrinks"
import ColdDrinks from "./Drinks/ColdDrinks"

const Tab = createMaterialTopTabNavigator();
  
export default function Drinks() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
              tabBarActiveTintColor: COLORS.orange,
              tabBarInactiveTintColor: COLORS.greyDark,
              tabBarStyle: styles.tab,
            })}>
        <Tab.Screen name="HotDrinks" component={HotDrinks} options={{tabBarLabel:"Sıcak İçecekler"}}/>
        <Tab.Screen name="ColdDrinks" component={ColdDrinks} options={{tabBarLabel:"Soğuk İçecekler"}}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    tab:{
        backgroundColor: COLORS.white, 
        borderTopColor: COLORS.greyLight, 
        borderTopWidth: 1, 
        borderBottomColor: COLORS.greyLight, 
        borderBottomWidth: 1
    }
})