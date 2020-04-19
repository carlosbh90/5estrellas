import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

//Para la función de validación de email
import { validateEmail } from "../../utils/Validation";

//Para insertar los datos en firebase:
import * as firebase from "firebase";

//Cargamos el loading
import Loading from "../Loading";

export default function LoginForm(props) {
  //Esto está declarado en el Login.js que es la página principal y se lo pasamos por variable cuando se llama
  const { toastRef } = props;
  const { navigation } = props;

  const [hidePassword, setHidePassword] = useState(true);

  //Para coger los datos enviados:
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Para el botón de loading
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  const login = async () => {
    setIsVisibleLoading(true);
    if (!email || !password) {
      //Esto está declarado en el Login.js que es la página principal y se lo pasamos por variable cuando se llama
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      //Valida si lo insertado es un email o no:
      const resultValidateEmail = validateEmail(email);
      if (!resultValidateEmail) {
        toastRef.current.show("El email no es válido");
      } else {
        //OK
        //El .then es que si entra ahí, ha ido todo correcto
        //El .cath es si ha dado fallo
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            console.log("Correcto");
            navigation.navigate("My Account");
          })
          .catch(() => {
            console.log("Incorrecto");

            toastRef.current.show("Usuario incorrecto");
          });
      }
    }
    setIsVisibleLoading(false);
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Email"
        containerStyle={styles.inputForm}
        //Es una función de flecha que envía un valor 'e' a setEmail
        onChange={(e) => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        password="true"
        secureTextEntry={hidePassword}
        containerStyle={styles.inputForm}
        //Es una función de flecha que envía un valor 'e' a setEmail
        onChange={(e) => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />

      <Button
        title="Iniciar Sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={login}
      />
      <Loading text="Iniciando Sesión" isVisible={isVisibleLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  iconRight: {
    color: "#c1c1c1",
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#00a680",
  },
});
