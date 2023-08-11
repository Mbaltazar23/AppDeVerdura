import React from "react";
import { Text, View, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { MyColors } from "../theme/AppTheme";

//interface Props extends StackNavigationProp<AdminOrderStackParamList, "AdminOrderDetailScreen" undefined>;

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  orderStatus: string;
  handleConfirmAction: () => void;
}

export const AdminOrderConfirmationOrderModal = ({
  modalVisible,
  setModalVisible,
  orderStatus,
  handleConfirmAction,
}: ModalProps) => {
  const getMessage = () => {
    if (orderStatus === "PAGADO") {
      return "Desea Despachar la Orden Seleccionada ?";
    } else if (orderStatus === "DESPACHADO") {
      return "Deseo Entregar la Orden Seleccionada ?";
    }
    return "";
  };

  return (
    <Modal visible={modalVisible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{getMessage()}</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                handleConfirmAction();
              }}
            >
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
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
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  modalButton: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: MyColors.primary,
    width: 100,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
