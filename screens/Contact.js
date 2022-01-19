import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Platform, StatusBar} from 'react-native';
import COLORS from '../utils/COLORS';

const Contact = () => {
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <View style={styles.container}>
                <Text style={styles.header}>ÜSTAT BÖREK/POĞAÇA SALONU</Text>
                <Text style={styles.text}>Kuruluş Yılı: 1997</Text>
                <Text style={styles.text}>Adres: Yahya Kemal Mahallesi Sanayi Caddesi No: 2A Kağıthane/İstanbul</Text>
                <Text style={styles.text}>Telefon: 0 (212) 294 33 86</Text>
            </View>
        </SafeAreaView>
    )
}

export default Contact;

const styles = StyleSheet.create({
    container:{
        backgroundColor: COLORS.greyLight2,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.height : 0
    },
    text:{
        color: COLORS.black,
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
        padding: 5,
    },
    header:{
        color: COLORS.black,
        fontSize: 32,
        fontWeight: "700",
        paddingBottom: 50,
        textAlign: "center",
    }
})