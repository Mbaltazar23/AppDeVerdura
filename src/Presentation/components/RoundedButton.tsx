import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { MyColors } from "../theme/AppTheme";

interface Props {
  text: string;
  onPress: () => void;
  style?: ViewStyle; // Prop opcional para el estilo personalizado del botón
  textStyle?: TextStyle; // Prop opcional para el estilo personalizado del texto
}

export const RoundedButton = ({ text, onPress, style, textStyle }: Props) => {
  return (
    <TouchableOpacity style={[styles.roundedButton, style]} onPress={onPress}>
      <Text style={[styles.textButton, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundedButton: {
    width: "100%",
    height: 50,
    backgroundColor: MyColors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  textButton: {
    color: "white",
  },
});
