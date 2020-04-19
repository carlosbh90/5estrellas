import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDLKoWHx8vXd-Jk3JDvxxY1h9YNUBwsqD8",
  authDomain: "pruebas-c42d7.firebaseapp.com",
  databaseURL: "https://pruebas-c42d7.firebaseio.com",
  projectId: "pruebas-c42d7",
  storageBucket: "pruebas-c42d7.appspot.com",
  messagingSenderId: "849906325093",
  appId: "1:849906325093:web:caea270b988e182d23588c",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDLKoWHx8vXd-Jk3JDvxxY1h9YNUBwsqD8",
    authDomain: "pruebas-c42d7.firebaseapp.com",
    databaseURL: "https://pruebas-c42d7.firebaseio.com",
    projectId: "pruebas-c42d7",
    storageBucket: "pruebas-c42d7.appspot.com",
    messagingSenderId: "849906325093",
    appId: "1:849906325093:web:caea270b988e182d23588c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
*/
