import React from "react";
import { Image, TouchableOpacity, Linking } from "react-native";

interface WhatsAppButtonProps {
  phoneNumber: string;
}

export const WhatsAppButton = ({ phoneNumber }: WhatsAppButtonProps) => {
  
  const handleOpenWhatsApp = () => {
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(whatsappUrl)
      .catch((error) => console.log("Error while opening WhatsApp:", error));
  };

  return (
    <TouchableOpacity onPress={handleOpenWhatsApp}>
      <Image
        source={require("../../../assets/wsp.png")}
        style={{ width: 35, height: 35 }}
      />
    </TouchableOpacity>
  );
};
