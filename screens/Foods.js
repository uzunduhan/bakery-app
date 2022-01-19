import React from "react";
import COLORS from "../utils/COLORS";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Borek from "./Foods/Borek"
import Pogaca from "./Foods/Pogaca"
import AcmaSimit from "./Foods/AcmaSimit"

const Tab = createMaterialTopTabNavigator();
  
export default function Drinks() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
              tabBarActiveTintColor: COLORS.orange,
              tabBarInactiveTintColor: COLORS.greyDark,
              tabBarStyle: styles.tab,
            })}>
        <Tab.Screen name="Borekler" component={Borek} options={{tabBarLabel:"Börekler"}}/>
        <Tab.Screen name="Pogacalar" component={Pogaca} options={{tabBarLabel:"Poğaçalar"}}/>
        <Tab.Screen name="AcmaSimit" component={AcmaSimit} options={{tabBarLabel:"Açmalar/Simit"}}/>
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