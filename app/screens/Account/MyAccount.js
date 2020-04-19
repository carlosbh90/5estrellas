import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import Loading from "../../components/Loading";

import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";

export default function MyAccount({ navigation }) {
  const [login, setLogin] = useState(null);

  //Vamos a preguntarle a firebase si el usuario está logueado
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // !user significa si user es null o false.
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if (login === null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }

  //Esto es un IF
  return login ? <UserLogged /> : <UserGuest navigation={navigation} />;
}
