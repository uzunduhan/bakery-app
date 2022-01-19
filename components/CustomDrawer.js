import React, {useState, useEffect} from "react";
import { View, StyleSheet} from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import COLORS from '../utils/COLORS';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth} from "../utils/firebaseApi";
import 'react-native-gesture-handler';

const CustomDrawer = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const onAuthStateChanged = (user) => {
    setIsLoggedIn(user);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);
    return unsubscribe;
  }, [])

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => props.navigation.navigate("Login"))
      .catch(error => alert(error.message))
  }

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <DrawerItem label="Çıkış Yap" inactiveTintColor={COLORS.black} onPress={() => handleSignOut()}/>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1, 
    backgroundColor: COLORS.white, 
    paddingTop: 10
  },
})