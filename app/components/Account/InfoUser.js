import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";

/*
IMPORTANTE: En firebase debemos activar Storage y cambiar la regla de escritura a:
write: if request.auth != null;
*/
import * as firebase from "firebase";

/*
Para poder subir una imagen debemos primero instalar estos dos paquetes de expo:

https://docs.expo.io/versions/v37.0.0/sdk/permissions/
expo install expo-permissions

https://docs.expo.io/versions/v37.0.0/sdk/imagepicker/
expo install expo-image-picker
*/
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

//Cargamos el loading
import Loading from "../Loading";

export default function InfoUser(props) {
  //Al ser un array el props, hacemos doble reestructuring:
  const {
    userInfo: { email, photoURL, displayName, uid },
  } = props;

  console.log(photoURL);

  const { userInfo } = props;

  //Para el botón de loading
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  //Esta función es para cambiar la foto de perfil
  const changeAvatar = async () => {
    //Variable para pedir permisos para acceder a la cámara:
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    /*
    Para que funcione en android tenemos que cambiar en app.json donde pone abajo del todo ios, añadir:
    "andoid": {
      "permissions": ["CAMERA_ROLL"]
    },
    */
    //La variable anterior nos devuelve el estado de los permisos en forma de array
    //cogemos el status:
    const resultPermissionsCamera =
      resultPermissions.permissions.cameraRoll.status;

    if (resultPermissionsCamera === "denied") {
      console.log("Es necesario aceptar los permisos");
    } else {
      //Si están aceptado los permisos, abrimos la galería de imágenes.
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      //setIsVisibleLoading(true);
      //Si esto es true significa que ha cancelado la selección de imágenes
      if (result.cancelled) {
        console.log("Has cerrado la galería");
      } else {
        //le pasamos el uid del usuario, para identificarlo como nombre único
        //El .then es para saber si se ha subido y el catch es error
        uploadImage(result.uri, uid).then(() => {
          console.log("imagen subida ok");
          //Ahora actualizamos el avatar de la página
          updatePhotoUrl(uid);
          //setIsVisibleLoading(false);
        });
      }
    }
  };

  // Como ponemos un await para que espere, la función debe de ser asíncrona.
  const uploadImage = async (uri, nameImage) => {
    const response = await fetch(uri);
    //response nos devuelve un array de datos. La imagen está en Blob que es lo que se subirá a firebase
    const blob = await response.blob();

    //subimos blob a firebase
    //Avatar es la carpeta que hemos creado en firebase/storage
    const ref = firebase.storage().ref().child(`avatar/${nameImage}`);

    return ref.put(blob);
  };

  //Para actualizar el avatar del usuario en firebase, le ponemos el uid al nombre de la img
  const updatePhotoUrl = (uid) => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (result) => {
        console.log(result);
        const update = {
          photoURL: result,
        };
        await firebase.auth().currentUser.updateProfile(update);

        console.log(firebase.auth().currentUser.photoURL);
        console.log("Foto actualizada");
      })
      .catch(() => {
        console.log("Error al actualizar Foto");
      });
  };

  return (
    <View style={styles.ViewUserInfo}>
      <Avatar
        rounded
        size="large"
        showEditButton
        onEditPress={changeAvatar}
        containerStyle={styles.userInfoAvatar}
        source={{
          uri: photoURL
            ? photoURL
            : "https://api.adorable.io/avatars/285/abott@adorable.png",
        }}
      />
      <View style={styles.displayNameStyle}>
        <Text>{displayName ? displayName : "Anónimo"}</Text>
        <Text>{email ? email : "Social Login"}</Text>
      </View>
      <Loading text="Subiendo imagen ..." isVisible={isVisibleLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  ViewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayNameStyle: {
    fontWeight: "bold",
  },
});
