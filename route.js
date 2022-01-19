import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import COLORS from "./utils/COLORS";
import Profile from "./screens/Profile";
import Contact from "./screens/Contact";
import LogIn from "./screens/LogIn";
import Register from "./screens/Register";
import CustomDrawer from "./components/CustomDrawer";
import Foods from "./screens/Foods";
import Drinks from "./screens/Drinks";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
          <Tab.Navigator screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: COLORS.orange,
              tabBarInactiveTintColor: COLORS.greyDark,
              tabBarStyle: { backgroundColor: COLORS.white },
          })}>
            <Tab.Screen 
              name="Foods" 
              component={Foods}
              options={{
                tabBarLabel: 'Yiyecekler',
                tabBarIcon: (tabInfo) => (
                  <Ionicons
                    name="restaurant"
                    size={tabInfo.focused ? 26 : 20}
                    color={tabInfo.focused ? COLORS.orange : COLORS.greyDark}
                  />
                ),
              }} />
            <Tab.Screen 
              name="Icecekler" 
              component={Drinks}
              options={{
                tabBarLabel: 'İçecekler',
                tabBarIcon: (tabInfo) => (
                  <Ionicons
                    name="cafe"
                    size={tabInfo.focused ? 26 : 20}
                    color={tabInfo.focused ? COLORS.orange : COLORS.greyDark}             
                  />
                ),
              }}/>
          </Tab.Navigator>
    );
}

const DrawerNavigator = () => {
  return(
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />} initialRouteName="Home" screenOptions={{
      drawerStyle: {
        backgroundColor: COLORS.white,
        width: 200,
      },
      drawerActiveBackgroundColor: COLORS.greyLight2,
      drawerActiveTintColor: COLORS.orange,
      headerTitle: "",
      headerTintColor: COLORS.greyDark,
      headerPressColor: COLORS.orange,
    }}>
            <Drawer.Screen name="Home" component={BottomTabs} options={{
              drawerIcon: ({focused, size}) => (
                <Ionicons
                  name="home"
                  size={size}
                  color={focused ? COLORS.orange : COLORS.greyDark}
                />
              ),
              drawerLabel: 'Ana Sayfa'
            }}/>
            <Drawer.Screen name="Profile" component={Profile} options={{
              drawerIcon: ({focused, size}) => (
                <Ionicons
                  name="person-circle"
                  size={size}
                  color={focused ? COLORS.orange : COLORS.greyDark}
                />
              ),
              drawerLabel: 'Profil'
            }}/>
            <Drawer.Screen name="Contact" component={Contact} options={{
              drawerIcon: ({focused, size}) => (
                <Ionicons
                  name="call"
                  size={size}
                  color={focused ? COLORS.orange : COLORS.greyDark}
                />
              ),
              drawerLabel: 'İletişim'
            }}/>
          </Drawer.Navigator>
  );
}

const App = () => {
  return (
      <SafeAreaProvider>
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false, 
                }}
            >
              <Stack.Screen name="Login" component={LogIn}/>
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="App" component={DrawerNavigator}/>
            </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
}

export default App;