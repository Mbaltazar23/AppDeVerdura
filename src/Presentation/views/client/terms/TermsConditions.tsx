import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ClientStackParamList } from "../../../navigator/ClientStackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import styles from "./Styles";

interface Props
  extends StackScreenProps<
    ClientStackParamList,
    "ClientTermsConditionsScreen"
  > {}

export const ClientTermsConditionsScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Bienvenido a App De Verdura</Text>
          <Text style={styles.content}>
            1. Selección de productos: Ofrecemos una amplia gama de productos
            agrícolas, verduras y frutas de alta calidad. Nos esforzamos por
            seleccionar cuidadosamente cada producto, asegurándonos de que
            cumpla con nuestros estándares de frescura y calidad. Sin embargo,
            la disponibilidad puede variar según la temporada y la ubicación.
          </Text>
          <Text style={styles.content}>
            2. Proceso de compra: Para realizar una compra, selecciona los
            productos y agrégalos a tu carrito de compras. Revisa tu pedido
            antes de confirmarlo y proporciona la información de entrega
            requerida. Recibirás una confirmación por correo electrónico con los
            detalles de tu compra.
          </Text>
          <Text style={styles.content}>
            3. Precios y pagos: Los precios mostrados están en la moneda local y
            pueden estar sujetos a cambios sin previo aviso. Aceptamos
            diferentes métodos de pago seguros para brindarte una experiencia de
            compra conveniente y confiable.
          </Text>
          <Text style={styles.content}>
            4. Entrega: Nos esforzamos por entregar tus productos de manera
            oportuna y en excelentes condiciones. Trabajamos con proveedores de
            logística confiables para garantizar que tus productos lleguen de
            manera segura a tu puerta. Ten en cuenta que la disponibilidad y las
            opciones de entrega pueden variar según tu ubicación.
          </Text>
          <Text style={styles.content}>
            5. Política de devoluciones: Si no estás satisfecho con tu compra,
            contáctanos dentro de un plazo razonable para resolver cualquier
            problema. Nuestra prioridad es tu satisfacción y trabajaremos
            contigo para encontrar una solución adecuada.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ClientCategoryListScreen")}
        >
          <Text style={styles.buttonText}>Volver al inicio</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
