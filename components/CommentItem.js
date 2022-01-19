import {Text, Image, View, StyleSheet } from "react-native";
import React from "react";
import COLORS from "../utils/COLORS";
import 'react-native-gesture-handler';

export const CommentItem=(props)=>{
        return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    {props.com}
                </Text>
            </View>)
}

const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        justifyContent: "center",
    },
    text: {
        marginLeft:3,
        fontSize:16,
        color:COLORS.black,
    },
})