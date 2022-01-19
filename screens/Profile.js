import React, { useEffect, useState, useRef } from 'react';
import {View, StyleSheet, SafeAreaView, FlatList, Alert, TextInput, KeyboardAvoidingView, TouchableOpacity, Text, Platform} from 'react-native';
import { database, auth } from '../utils/firebaseApi';
import COLORS from "../utils/COLORS"
import firebase from 'firebase';
import { CommentItem } from '../components/CommentItem';
import Constants from "expo-constants";
import * as Notifications from 'expo-notifications';


const Profile = () => {
    const [data, setData] = useState([]);
    const [comment, setComment] = useState([]);
    useEffect(()=>{
        var tempData = [];
        database.collection("users").doc(auth.currentUser.uid).get().then(doc=>{
        doc.data().gorusler.forEach(item=>{
            // console.log(item.gorus.com);
            tempData.push(item.gorus);
        });
        setData(tempData)
        console.log(tempData)
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    },[]);

    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Başarılı!",
                body: 'Görüşünüz bildirilmiştir. İyi günler dileriz.',
            },
            trigger: null,
        });
    }

    const addComment = () => {
        if(comment.length > 0){
            database.collection("users").doc(auth.currentUser.uid).update({
                gorusler:firebase.firestore.FieldValue.arrayUnion({gorus:{
                    com: comment,
                }})
            });
            let newData = [...data, {com: comment}];
            setData(newData);
            schedulePushNotification()
        }
        else{
            Alert.alert('Hata!', 'Lütfen geçerli bir yorum yapınız.', [{text: 'Tamam', onPress: () => console.log('Alert closed.')}])
        } 
    }

    const renderItem = ({ item }) => {
        return(
            <CommentItem com={item.com}/>
        )
    }

    const itemSeparator = () => (
        <View style={styles.itemSeparator}/>
    );

    return(
        <SafeAreaView style={styles.container} >
            <KeyboardAvoidingView behavior="padding">
                <View style={styles.flat}>
                <Text style={styles.text}>Kullanıcının E-Mail Adresi: {auth.currentUser.email}</Text>
                <Text style={styles.header}>Görüşler</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={renderItem}
                    ItemSeparatorComponent={itemSeparator}
                />
                </View>
                <View style={styles.comment}> 
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Yorum yaz..." style={styles.input} value={comment} onChangeText={text => setComment(text)}/>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={addComment} style={styles.button}>
                        <Text style={styles.buttonText}>Görüş Bildir</Text>
                    </TouchableOpacity>
                </View>
                </View> 
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Profile;

const styles = StyleSheet.create({

    container: {
      flex: 1,
      marginTop: 20,
      alignItems: 'center',
      backgroundColor: COLORS.greyLight2,
    },
    flat:{
        flex:2,
        backgroundColor: COLORS.greyLight2,
    },
    comment:{
        flex:2,
        backgroundColor: COLORS.greyLight2,
    },
    inputContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    input: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.black,
        marginTop: 5,
        width: 300,
        height: 50,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 20,
    },
    button: {
        backgroundColor: COLORS.orange,
        width: 200,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: '700',
        fontSize: 16,
        color: COLORS.white,
    },
    text: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        color: COLORS.black,
        fontSize: 16,
        marginTop: 5,
    },
    header: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        color: COLORS.black,
        fontSize: 20,
        fontWeight: "600",
        marginTop: 5,
        textAlign: "center",
    },
    itemSeparator: {
        height: 1, 
        width: "100%", 
        backgroundColor: COLORS.orange, 
        marginVertical: 12,
    },
  })