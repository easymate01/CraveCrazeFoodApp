import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as Icon from "react-native-feather";
import { featured } from "../constants";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { themeColors } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../slices/cartSlice";
import { selectRestaurant } from "../slices/restaurantSlice";

export default function DeliveryScreen() {
  const restaurant = useSelector(selectRestaurant);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleCancel = () => {
    navigation.navigate("Home");
    dispatch(emptyCart());
  };
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
            latitude: restaurant.la  t,
            longitude: restaurant.lng,
          }}
          title={restaurant.name}
          description={restaurant.description}
          pinColor={themeColors.bgColor(1)}
        />
      </MapView>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
          navigation.goBack();
        }}
        style={styles.backButton}
      >
        <Icon.ArrowLeft
          strokeWidth={3}
          stroke={themeColors.bgColor(1)}
        ></Icon.ArrowLeft>
      </TouchableOpacity>
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
        <View style={styles.bottomContainer}>
          <View style={styles.deliveryInfoContainer}>
            <View style={styles.deliveryGuyContainer}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.deliveryGuyImage}
                  source={require("../assets/images/deliveryGuy.png")}
                />
              </View>
              <View style={styles.deliveryGuyTextContainer}>
                <Text style={styles.name}>Minta János</Text>
                <Text style={styles.role}>Your Rider</Text>
              </View>
              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity style={styles.iconButton}>
                  <Icon.Phone
                    fill={themeColors.bgColor(1)}
                    stroke={themeColors.bgColor(1)}
                    strokeWidth={1}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCancel}
                  style={styles.iconButton}
                >
                  <Icon.X stroke={"red"} strokeWidth={5} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  bottomContainer: {
    backgroundColor: themeColors.bgColor(0.8),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    borderRadius: 50,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  deliveryInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  deliveryGuyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    padding: 5,
    borderRadius: 999,
  },
  deliveryGuyImage: {
    width: 80,
    height: 80,
    borderRadius: 999,
  },
  deliveryGuyTextContainer: {
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  role: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 999,
    marginHorizontal: 5,
  },
  backButton: {
    position: "absolute",
    top: 49,
    left: 20,
    backgroundColor: "white",
    padding: 2,
    borderRadius: 999,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
};
