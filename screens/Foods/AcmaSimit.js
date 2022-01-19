import React, { useLayoutEffect, useState } from 'react';
import {View, Platform, StyleSheet, SafeAreaView, FlatList, StatusBar} from 'react-native';
import { database, auth } from '../../utils/firebaseApi';
import COLORS from "../../utils/COLORS";
import {AcmaSimitItem} from '../../components/AcmaSimitItem';

const AcmaSimit = () => {
const [data, setData] = useState([]);

useLayoutEffect(()=>{
    var tempData = [];
    database.collection("acmasimitler").doc("cesitler").get().then(doc=>{
    doc.data().acmasimitCesitleri.forEach(item=>{
            tempData.push(item.acmasimit)
        })
    setData(tempData)
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
},[]);

const renderItem = ({ item }) => {
    return(
        <AcmaSimitItem name={item.name} cost={item.cost} image={item.image}/>
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

export default AcmaSimit;
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