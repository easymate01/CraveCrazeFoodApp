import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { featured } from "../constants";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { themeColors } from "../theme";

export default function DeliveryScreen() {
  const restaurant = featured.restaurants[0];
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={{ flex: 1 }}
        mapType="standard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.lng,
          }}
          title={restaurant.name}
          description={restaurant.description}
          pinColor={themeColors.bgColor(1)}
        />
      </MapView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.absoluteButton}></TouchableOpacity>
        <View style={styles.innerContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Estimated Arrival</Text>
            <Text style={styles.time}>20-30 Minutes</Text>
            <Text style={styles.statusText}>Your Order is own its way</Text>
          </View>
          <Image
            style={styles.image}
            source={require("../assets/images/bikeGuy2.gif")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = {
  container: {
    borderRadius: 20,
    marginTop: 0,
    backgroundColor: "white",
    position: "relative",
  },
  absoluteButton: {
    position: "absolute",
    right: 4,
    top: 2,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  infoContainer: {
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B5563",
  },
  time: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4B5563",
    marginTop: 5,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B5563",
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
};
