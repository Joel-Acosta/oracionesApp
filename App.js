import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Button,
  ScrollView,
  Image,
} from "react-native";

import { oraciones } from "./assets/oraciones";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const DATA = [];
  oraciones.categorias.forEach((item) => {
    DATA.push(item);
  });

  const obtenerNombresDeOraciones = (data) => {
    let nombres = [];
    data.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        if (Array.isArray(obj[key])) {
          nombres.push({ nombre: key.replace(/_/g, " "), contenido: obj[key] });
        }
      });
    });
    return nombres;
  };

  const manejarClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  /*   const Item = ({ title, contenido }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => manejarClick({ nombre: title, contenido })}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  ); */

  const Item = ({ title, contenido }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => manejarClick({ nombre: title, contenido })}
    >
      <View style={styles.row}>
        <Image
          source={require("./assets/jesus.jpg")} // Cambia por tu imagen
          style={styles.icon}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  const nombres = obtenerNombresDeOraciones(DATA);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={nombres}
        ListHeaderComponent={
          <Image
            source={require("./assets/Lastsupper.png")}
            style={{
              width: "100%",
              height: 150,
            }}
          />
        }
        renderItem={({ item }) => (
          <Item title={item.nombre} contenido={item.contenido} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Modal con ScrollView */}
      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedItem.nombre}</Text>
              {/* Contenido desplazable */}
              <ScrollView style={styles.modalBody}>
                {selectedItem.contenido.map((oracion, index) => (
                  <View key={index} style={styles.oracionItem}>
                    <Text style={styles.oracionTitle}>{oracion.title}</Text>
                    {oracion.author && (
                      <Text style={styles.oracionAuthor}>{oracion.author}</Text>
                    )}
                    {oracion.title === "" ? (
                      <Text style={styles.specialTitle}>{oracion.text}</Text>
                    ) : (
                      <Text style={styles.oracionText}>{oracion.text}</Text>
                    )}
                    <Text style={styles.separator}>☦</Text>
                  </View>
                ))}
              </ScrollView>
              <Button
                title="Volver"
                onPress={() => setModalVisible(false)}
                color="#98694d"
              />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "wheat",
    paddingTop: 40,
    paddingBottom: 10,
  },
  image: {
    width: 200, // Ancho de la imagen
    height: 200, // Alto de la imagen
    resizeMode: "contain", // Ajuste de la imagen
  },
  item: {
    backgroundColor: "#e8c48e",
    padding: 4,
    marginVertical: 8,
    marginHorizontal: 26,
    borderRadius: 5,
    elevation: 10,
  },
  row: {
    flexDirection: "row", // Coloca elementos en fila
    alignItems: "center", // Centra verticalmente
  },
  icon: {
    width: 50, // Ajusta el tamaño de la imagen
    height: 50,
    marginRight: 10, // Espacio entre imagen y texto
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#553d3a",
    flexShrink: 1, // Permite ajustar el tamaño del texto
    maxWidth: "80%", // Limita el ancho máximo del texto
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "wheat",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: "80%", // Limita la altura para que ScrollView sea útil
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalBody: {
    width: "100%",
    marginBottom: 15,
  },
  oracionItem: {
    marginBottom: 10,
  },
  oracionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#c24036",
  },
  specialTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  oracionText: {
    fontSize: 16,
    textAlign: "center",
    color: "#553d3a",
    fontWeight: "bold",
  },
  oracionAuthor: {
    fontSize: 14,
    textAlign: "center",
    color: "#5374bd",
    marginBottom: 10,
    marginTop: -10,
  },
  status: {
    width: "100%",
    height: 150,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    textAlign: "center",
    fontSize: 30,
    color: "#841584", // Color verde suave o el que prefieras
    marginVertical: 10,
  },
});
