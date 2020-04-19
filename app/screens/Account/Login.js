import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider, Button } from "react-native-elements";

//Importamos el formulario de Login
import LoginForm from "../../components/Account/LoginForm";

//El toast son las alertas para cuando no ha rellenado un campo
//Esto hay que importarlo en la página principal, si lo queremos usar en el loginForm, lo pasamos por props
//Es necesario importar el useRef en React para pasar la referencia
import Toast from "react-native-easy-toast";

//Cargamos el login de facebook
import LoginFacebook from "../../components/Account/LoginFacebook";

export default function Login(props) {
  //Recuperamos el navigation para el botón de create account
  const { navigation } = props;

  //Inicializamos el useRef para poder usarlo en el toast
  const toastRef = useRef();

  return (
    //scrollEnabled={false} le quita el scroll
    <ScrollView>
      <Image
        source={require("../../../assets/img/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.viewContainer}>
        {/*Formulario de inicio de sesión*/}
        <LoginForm toastRef={toastRef} navigation={navigation} />
        {/*<Text>Create account</Text>*/}
        <CreateAccount navigation={navigation} />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.viewContainer}>
        <LoginFacebook toastRef={toastRef} navigation={navigation} />
      </View>
      <Toast ref={toastRef} positionValue={550} opacity={0.5} />
    </ScrollView>
  );
}

function CreateAccount(props) {
  const { navigation } = props;

  return (
    <Text style={styles.textRegister}>
      ¿Aún no tienes cuenta?
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("Register")}
      >
        {" "}
        Regístrate
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  btnRegister: {
    color: "#00a860",
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 40,
  },
});
