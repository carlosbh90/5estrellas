import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";

//Para hacer este import antes hay que descargarse esta librería:
// yarn add expo-facebook
import * as Facebook from "expo-facebook";

//Para insertar los datos en firebase:
import * as firebase from "firebase";

//Importamos los datos de facebook, lo hemos separado para tenerlo organizado
import { FacebookApi } from "../../utils/Social";

//Cargamos el loading
import Loading from "../Loading";

// Async es para que acabe cada línea para continuar
export default function LoginFacebook(props) {
  //Hacemos destructuring del props para sacar el toast
  const { toastRef } = props;
  const { navigation } = props;

  //Para el botón de loading
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  const login = async () => {
    Facebook.initializeAsync(FacebookApi.application_id); // Aqui necesitamos el APP Id
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: FacebookApi.permissions, // Solamente se necesita el permiso aqui
    });

    if (type == "success") {
      setIsVisibleLoading(true);
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          console.log("Login correcto...!");
          navigation.navigate("My Account");
        })
        .catch(() => {
          console.log("Error accediendo Facebook, intente más tarde");
        });
    } else if (type == "cancel") {
      toastRef.current.show("Inicio de session cancelado");
    } else {
      toastRef.current.show("Error desconocido, intentelo mas tarde");
    }

    setIsVisibleLoading(false);
  };

  return (
    //Se le pasa lo siguiente porque solo puede tener un fragmento y no queremos meterlo en un View
    <>
      <SocialIcon
        title="Iniciar sesión con Facebook"
        button
        type="facebook"
        onPress={login}
      />

      <Loading text="Iniciando sesión" isVisible={isVisibleLoading} />
    </>
  );
}
