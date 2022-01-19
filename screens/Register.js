import React, {useState, useEffect} from "react";
import { Text, SafeAreaView, View, StyleSheet, KeyboardAvoidingView, TextInput} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import COLORS from "../utils/COLORS";
import { auth, database } from "../utils/firebaseApi";
import 'react-native-gesture-handler';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const onAuthStateChanged = (user) => {
    setIsLoggedIn(user);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);
    return unsubscribe;
  }, [])

  const handleSignUp = () => {
    auth.createUserWithEmailAndPassword(email, password)
    .then(authUser => {
      console.log(authUser.user);
      database.collection("users").doc(authUser.user.uid).set({
          userId: authUser.user.uid,
          gorusler: [],
      })     
  })
  .then(()=>navigation.navigate("App"))
  .catch(error => alert(error.message))
  }

  return(
    <SafeAreaView style={styles.container} >
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.inputContainer}>
          <Text style={styles.header}>Kullanıcı Kaydı</Text>
          <TextInput placeholder="E-Mail" style={styles.input} value={email} onChangeText={text => setEmail(text)}/>
          <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={text => setPassword(text)} secureTextEntry/>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Kayıt Ol</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.goBack()} style={[styles.button,styles.buttonOutline]}>
            <Text style={styles.buttonText}>Geri Dön</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Register;

const styles = StyleSheet.create({
  scroll: {
    flex:1,
    backgroundColor: COLORS.greyLight2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.greyLight2,
  },
  header: {
    paddingBottom: 20,
    color: COLORS.black,
    fontSize: 22,
    marginTop: 5,
    fontWeight: "700",
    textAlign: "center"
  },
  inputContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.black,
    marginTop: 5,
    width: 200,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
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
    color: COLORS.white
  },
  text: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: COLORS.black,
    fontSize: 16,
    marginTop: 5,
  },
  buttonOutline: {
    backgroundColor: COLORS.orange,
    marginTop: 5,
  },
})