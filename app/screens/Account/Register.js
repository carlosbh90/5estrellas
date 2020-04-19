//Importa el useRef para poder usarlo con el toast
import React, { useRef } from "react";

import { StyleSheet, View, Image } from "react-native";

//El toast son las alertas para cuando no ha rellenado un campo
//Esto hay que importarlo en la página principal, si lo queremos usar en el loginForm, lo pasamos por props
//Es necesario importar el useRef en React para pasar la referencia
import Toast from "react-native-easy-toast";

//Esto es para que el formulario tenga scroll, hay que instalar lo siguiente:
//https://yarnpkg.com/package/react-native-keyboard-aware-scroll-view
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import RegisterForm from "../../components/Account/RegisterForm";

export default function Register({ navigation }) {
  //Inicializamos el useRef para poder usarlo en el toast
  const toastRef = useRef();

  //console.log(toastRef);
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/img/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.viewForm}>
        <RegisterForm toastRef={toastRef} navigation={navigation} />
      </View>

      <Toast ref={toastRef} positionValue={350} opacity={0.5} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
});
