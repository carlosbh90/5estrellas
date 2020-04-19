import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button, Text } from "react-native-elements";

//Para la función de validación de email
import { validateEmail } from "../../utils/Validation";

//Cargamos el loading
import Loading from "../Loading";

//Para insertar los datos en firebase:
import * as firebase from "firebase";

export default function RegisterForm(props) {
  //Hacemos destructuring del props para sacar el toast
  const { toastRef } = props;
  const { navigation } = props;

  //console.log(toastRef);
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword2, setHidePassword2] = useState(true);

  //Para coger los datos enviados:
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  //Para el botón de loading
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  //Es un método asíncrono, lo ejecuta todo por línea, hasta que no llegue al final,
  //no ejecutará el loading a false
  const register = async () => {
    setIsVisibleLoading(true);
    if (!email || !password || !passwordRepeat) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      //Valida si lo insertado es un email o no:
      const resultValidateEmail = validateEmail(email);
      if (!resultValidateEmail) {
        toastRef.current.show("El email no es válido");
      } else {
        if (password !== passwordRepeat) {
          toastRef.current.show("Contraseñas deben ser iguales");
        } else {
          //El .then es que si entra ahí, ha ido todo correcto
          //El .cath es si ha dado fallo
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              navigation.navigate("My Account");
            })
            .catch(() => {
              toastRef.current.show(
                "Error al crear el usuario, inténtelo más tarde"
              );
            });
        }
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
        placeholder="Password"
        password="true"
        secureTextEntry={hidePassword}
        containerStyle={styles.inputForm}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            //Si hidePassword es true, pone un icono, si no otro
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            // El ! lo que hace es poner lo contrartio de lo que tiene
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      <Input
        placeholder="Repeat Password"
        password="true"
        secureTextEntry={hidePassword2}
        containerStyle={styles.inputForm}
        onChange={(e) => setPasswordRepeat(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            //Si hidePassword es true, pone un icono, si no otro
            name={hidePassword2 ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            // El ! lo que hace es poner lo contrartio de lo que tiene
            onPress={() => setHidePassword2(!hidePassword2)}
          />
        }
      />
      <Button
        title="Enviar"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={register}
      />
      <Loading text="Creando cuenta" isVisible={isVisibleLoading} />
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

  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#00a860",
  },
});
