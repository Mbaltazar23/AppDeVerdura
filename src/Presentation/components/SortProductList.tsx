import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MyColors } from "../theme/AppTheme";

enum SortOption {
  NameAscending = "Nombre: A-Z",
  NameDescending = "Nombre: Z-A",
  PriceHighToLow = "Precio: de mayor a menor",
  PriceLowToHigh = "Precio: de menor a mayor",
}

interface SortModalProps {
  visible: boolean;
  selectedSortOption: SortOption | null;
  onClose: () => void;
  onSelectSortOption: (option: SortOption) => void;
}

export const SortModal = ({
  visible,
  selectedSortOption,
  onClose,
  onSelectSortOption,
}: SortModalProps) => {
  
  const handleSortOptionSelected = (option: SortOption) => {
    onSelectSortOption(option);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={[
                styles.sortOption,
                selectedSortOption === SortOption.NameAscending &&
                  styles.selectedSortOption,
              ]}
              onPress={() => handleSortOptionSelected(SortOption.NameAscending)}
            >
              <Text style={styles.sortOptionText}>
                {SortOption.NameAscending}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortOption,
                selectedSortOption === SortOption.NameDescending &&
                  styles.selectedSortOption,
              ]}
              onPress={() =>
                handleSortOptionSelected(SortOption.NameDescending)
              }
            >
              <Text style={styles.sortOptionText}>
                {SortOption.NameDescending}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortOption,
                selectedSortOption === SortOption.PriceHighToLow &&
                  styles.selectedSortOption,
              ]}
              onPress={() =>
                handleSortOptionSelected(SortOption.PriceHighToLow)
              }
            >
              <Text style={styles.sortOptionText}>
                {SortOption.PriceHighToLow}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortOption,
                selectedSortOption === SortOption.PriceLowToHigh &&
                  styles.selectedSortOption,
              ]}
              onPress={() =>
                handleSortOptionSelected(SortOption.PriceLowToHigh)
              }
            >
              <Text style={styles.sortOptionText}>
                {SortOption.PriceLowToHigh}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    minWidth: 200,
  },
  sortOption: {
    paddingVertical: 10,
  },
  selectedSortOption: {
    backgroundColor: MyColors.primary,
  },
  sortOptionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});
