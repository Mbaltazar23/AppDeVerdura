import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface TransferDataTextsProps {
  nombre: string;
  correo: string;
  rut: string;
  chequeraElectronica: string;
  banco:string
}

export const TransferDataTexts = ({
  nombre,
  correo,
  rut,
  chequeraElectronica,
  banco
}: TransferDataTextsProps) => {
  return (
    <View>
      <Text style={styles.modalText}>Nombre: {nombre}</Text>
      <Text style={styles.modalText}>Correo: {correo}</Text>
      <Text style={styles.modalText}>Rut: {rut}</Text>
      <Text style={styles.modalText}>
        Chequera Electronica: {chequeraElectronica}
      </Text>
      <Text style={styles.modalText}>
        Nombre del Banco: {banco}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalText: {
    fontSize: 14,
    marginBottom: 10,
    margin: 8,
  },
});
