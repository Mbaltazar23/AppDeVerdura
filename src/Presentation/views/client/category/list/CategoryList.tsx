import { StackScreenProps } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
//import Carousel from "react-native-reanimated-carousel";
import { ClientCategoryItem } from "./Item";
import useViewModel from "./ViewModel";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientCategoryListScreen"> {}

export const ClientCategoryListScreen = ({ navigation, route }: Props) => {
  const { categories, getCategories } = useViewModel();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [mode, setMode] = useState<any>("horizontal-stack");
  const [snapDirection, setSnapDirection] = useState<"left" | "right">("left");

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <GestureHandlerRootView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{
        position:"absolute",
        alignSelf: 'center',
        top: height * 0.1
      }}>
      
      </View>
    </GestureHandlerRootView>
  );
};
