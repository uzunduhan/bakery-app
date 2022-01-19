import {Text, Image, View, StyleSheet } from "react-native";
import React from "react";
import COLORS from "../utils/COLORS";
import 'react-native-gesture-handler';

export const ColdDrinkItem=(props)=>{
        return(
            <View style={styles.container}>
                <Image 
                    style={styles.image}
                    source={{uri: props.image}}
                >
                </Image>
                <Text style={styles.text}>
                {props.name}
                </Text>
                <View style={styles.view1}>
                    <Text
                        style={styles.cost}>
                        Fiyat: {props.cost} ₺
                    </Text>
                </View>
            </View>)
}

const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        flexDirection:"row",
        width:"100%",
    },
    image: {
        height:60,
        width:60
    },
    text: {
        marginLeft:3,
        fontSize:12,
        fontWeight:"bold",
        color:COLORS.black,
    },
    view1: {
        marginLeft:"auto",
        flexDirection:"column",
        flex: 2,
    },
    cost: {
        textAlign:"right",
        fontSize:12,
        fontWeight:"bold",
        color:COLORS.black,
    },
})