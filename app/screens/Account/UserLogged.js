import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { Button } from "react-native-elements";

//Importamos la pagina de info user
import InfoUser from "../../components/Account/InfoUser";

import * as firebase from "firebase";

export default function UserLogged() {
  //Obtenemos aquí la info del usuario porque lo usaremos en diferentes páginas, InfoUser, etc
  //IMPORTANTE: en useState le pasamos entre paréntesis {} porque es un array
  const [userInfo, setUserInfo] = useState({});

  //El useEffect se actualiza cuando montamos el componente o
  //cuando se actualiza alguna variabla que le pasamos por el array []
  //Se usa por ejemplo cuando cambia el nombre, que se actualice solo el nombre
  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      //El user es un array: user[providerData][elementos], con el console log se puede ver
      setUserInfo(user.providerData[0]);
    })();
  }, []);

  return (
    <ScrollView style={styles.viewBody} centerContent={true}>
      <Image
        source={require("../../../assets/img/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <InfoUser userInfo={userInfo} />

      <View style={styles.viewForm}>
        <Button
          title="Cerrar sesión"
          buttonStyle={styles.btnStyles}
          onPress={() => firebase.auth().signOut()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 50,
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 40,
  },
  btnStyles: {
    backgroundColor: "#00a680",
  },
});
