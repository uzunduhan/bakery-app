import React, { useEffect, useState } from 'react';
import {View, Platform, StyleSheet, SafeAreaView, FlatList, StatusBar} from 'react-native';
import { BorekItem } from '../../components/BorekItem';
import { database, auth } from '../../utils/firebaseApi';
import COLORS from "../../utils/COLORS"

const Borek = () => {
const [data, setData] = useState([]);

useEffect(()=>{
    var tempData = [];
    database.collection("borekler").doc("cesitler").get().then(doc=>{
        doc.data().borekCesitleri.forEach(item=>{
            tempData.push(item.borek)
        });
        setData(tempData)
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
},[]);

const renderItem = ({ item }) => {
    return(
        <BorekItem name={item.name} cost={item.cost} image={item.image}/>
    )
}

const itemSeparator = () => (
    <View style={styles.itemSeparator}/>
);
    return(
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <View style={styles.view}>
          <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={renderItem}
              ItemSeparatorComponent={itemSeparator}
          >
          </FlatList>
        </View>     
  </SafeAreaView>
    )
}

export default Borek;
const styles = StyleSheet.create({
  container: {
      flex:1, 
      backgroundColor:COLORS.greyLight2, 
      color: COLORS.white,
      paddingTop: Platform.OS === 'android' ? StatusBar.height : 0
  },
  itemSeparator: {
      height: 1, 
      width: "100%", 
      backgroundColor: COLORS.orange, 
      marginVertical: 12,
  },
  view: {
      backgroundColor:COLORS.greyLight2, 
      padding:16,
  },
  text: {
      color: COLORS.white,
      fontSize: 16,
  },
});