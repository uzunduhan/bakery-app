import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC9esg4ewM213_6X8F_ZpNIpXLoQilEFiE",
  authDomain: "mobilproje-a3d7e.firebaseapp.com",
  projectId: "mobilproje-a3d7e",
  storageBucket: "mobilproje-a3d7e.appspot.com",
  messagingSenderId: "736632055182",
  appId: "1:736632055182:web:902ab5a78885dc3f59f0df"
};

let app;
if (firebase.apps.length === 0 ){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app()
}

export const auth = firebase.auth()

export const database = app.firestore()