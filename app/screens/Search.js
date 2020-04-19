import React from "react";
import { Button, View, Text } from "react-native";

export default function Search({ navigation }) {
  //console.log(navigation);
  return (
    <View>
      <Text>Estamos en el Buscador</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}
