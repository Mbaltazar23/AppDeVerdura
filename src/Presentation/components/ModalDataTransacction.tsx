import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { TransferDataTexts } from "../constants/DataTransacction";
import { MyColors } from "../theme/AppTheme";

interface TransferDataModalProps {
  visible: boolean;
  onClose: () => void;
}

export const TransferDataModal = ({
  visible,
  onClose,
}: TransferDataModalProps) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Datos de Transferencia</Text>
          <TransferDataTexts // Usar el nuevo componente para mostrar los textos
            nombre="Nicolas Andres Diaz Moscoso"
            correo="n.diazmoscoso@gmail.com"
            rut="17.370.038-5"
            chequeraElectronica="01070771507"
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: MyColors.primary,
    padding: 10,
    width:'100%',
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
