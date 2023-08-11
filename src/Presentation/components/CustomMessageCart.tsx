import React, { useEffect, useRef } from "react";
import { Text, Image, Animated, StyleSheet, View } from "react-native";

interface Props {
  onAnimationEnd: () => void;
  message: string;
}

export const ActionToCartMessage = ({ onAnimationEnd, message }: Props) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const showAnimation = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideAnimation = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      onAnimationEnd();
      scaleAnim.setValue(0); // Reiniciar la escala a 0 para la siguiente animación
    });
  };

  useEffect(() => {
    showAnimation();

    const timer = setTimeout(() => {
      hideAnimation();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
      ]}
    >
      <Image source={require("../../../assets/logo.png")} style={styles.logo} />
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{message}</Text>
      </View>
      <Image
        source={require("../../../assets/checkmark.png")}
        style={styles.checkmark}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "40%",
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 96,
    height: 96,
    position: "absolute",
    top: -110,
    alignSelf: "center",
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  message: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  checkmark: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});
