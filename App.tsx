import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { MainStackNavigator } from "./src/Presentation/navigator/MainStackNavigator";

const App = () => {
  StatusBar.setTranslucent(true);
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default App;
