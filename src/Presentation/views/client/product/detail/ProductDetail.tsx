import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import styles from "./Styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useViewModel from "./ViewModel";
import { RoundedButton } from "../../../../components/RoundedButton";
/*import Carousel from "react-native-reanimated-carousel";*/

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientProductDetailScreen"> {}

export const ClientProductDetailScreen = ({ navigation, route }: Props) => {
  const { product } = route.params;
  
  const { quantity, price, addItem, removeItem, addToBag } =
    useViewModel(product);

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>
      </GestureHandlerRootView>
      <View style={styles.productDetail}>
        <View style={styles.productInfo}>
          {/*NOMBRE */}
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.divider}></View>
          {/*DESCRIPTION */}
          <Text style={styles.descriptionTitle}>Descripcion</Text>
          <Text style={styles.descriptionContent}>{product.description}</Text>
          <View style={styles.divider}></View>
          {/*PRECIO */}
          <Text style={styles.descriptionTitle}>Precio</Text>
          <Text style={styles.descriptionContent}>${product.price}</Text>
          <View style={styles.divider}></View>
          {/*ORDEN */}
          <Text style={styles.descriptionTitle}>Tu Orden</Text>
          <Text style={styles.descriptionContent}>Cantidad: {quantity}</Text>
          <Text style={styles.descriptionContent}>Precio total: {price}</Text>
          <View style={styles.divider}></View>
        </View>

        <View style={styles.productActions}>
          <TouchableOpacity
            onPress={() => removeItem()}
            style={styles.actionLess}
          >
            <Text style={styles.actionText}>-</Text>
          </TouchableOpacity>
          <View style={styles.quantity}>
            <Text style={styles.actionText}>{quantity}</Text>
          </View>
          <TouchableOpacity onPress={() => addItem()} style={styles.actionAdd}>
            <Text style={styles.actionText}>+</Text>
          </TouchableOpacity>

          <View style={styles.buttonAdd}>
            <RoundedButton text="AGREGAR" onPress={() => addToBag()} />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.back} onPress={() => navigation.pop()}>
        <Image
          style={styles.backImage}
          source={require("../../../../../../assets/back.png")}
        />
      </TouchableOpacity>
    </View>
  );
};
