import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { MyColors } from "../theme/AppTheme";

interface DeleteConfirmationProps {
  type: "product" | "category";
  onConfirm: () => void;
  onCancel: () => void;
  visible: boolean;
}

export const AdminDeleteConfirmation = ({
  type,
  onConfirm,
  onCancel,
  visible,
}: DeleteConfirmationProps) => {

  let confirmationMessage = "";
  if (type === "product") {
    confirmationMessage = "¿Estás seguro de que deseas eliminar este producto?";
  } else if (type === "category") {
    confirmationMessage =
      "¿Estás seguro de que deseas eliminar esta categoría?";
  }

  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <Text style={styles.message}>{confirmationMessage}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
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
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: MyColors.primary,
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
