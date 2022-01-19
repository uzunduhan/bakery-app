import React, {useState, useEffect} from "react";
import { Text, SafeAreaView, View, StyleSheet, KeyboardAvoidingView, TextInput} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import COLORS from "../utils/COLORS";
import { auth } from "../utils/firebaseApi";
import 'react-native-gesture-handler';

const LogIn = ({navigation}) => {

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

  const handleLogin = () => {
    auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
    })
    .then(()=>navigation.navigate("App"))
    .catch(error => alert(error.message))
  }

  return(
    <SafeAreaView style={styles.container} >
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.inputContainer}>
          <Text style={styles.header}>Kullanıcı Girişi</Text>
          <TextInput placeholder="E-Mail" style={styles.input} value={email} onChangeText={text => setEmail(text)}/>
          <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={text => setPassword(text)} secureTextEntry/>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("Register")} style={[styles.button,styles.buttonOutline]}>
            <Text style={styles.buttonText}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LogIn;

const styles = StyleSheet.create({
  scroll: {
    flex:1,
    backgroundColor: COLORS.greyLight2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingBottom: 20,
    color: COLORS.black,
    fontSize: 22,
    marginTop: 5,
    fontWeight: "700",
    textAlign: "center"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.greyLight2,
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
  buttonOutline: {
    backgroundColor: COLORS.orange,
    marginTop: 5,
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
})