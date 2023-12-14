import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import * as Icon from "react-native-feather";

export default function RestaurantCard({
  item,
  //   title,
  //   imgUrl,
  //   rating,
  //   type,
  //   address,
  //   description,
  //   dishes,
  //   reviews,
  //   lng,
  //   lat,
}) {
  return (
    <TouchableWithoutFeedback
    //   onPress={() => {
    //     navigation.navigate("Resturant", {
    //       id,
    //       title,
    //       imgUrl,
    //       rating,
    //       type,
    //       address,
    //       description,
    //       dishes,
    //       lng,
    //       reviews,
    //       lat,
    //     });
    //   }}
    >
      <View style={styles.container}>
        <Image style={styles.image} source={item.image} />

        <View style={{ paddingBottom: 10 }}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.rating}>
            <Text>
              <Text className="text-green-700">{item.description}</Text>

              <Text className="font-semibold text-gray-700">{item.text}</Text>
            </Text>
          </View>
          <View style={styles.address}>
            <Icon.MapPin color="gray" width={15} height={15} />
            <Text style={styles.address}>Nearby · {item.address}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 6,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
  },
  image: {
    height: 144,
    width: 256,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 8,
    paddingLeft: 12,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 4,
    paddingLeft: 12,
  },
  star: {
    height: 16,
    width: 16,
  },
  ratingText: {
    fontSize: 12,
    color: "#4B5563",
    paddingLeft: 4,
  },
  type: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4B5563",
    paddingLeft: 4,
  },
  address: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 12,
    color: "#4B5563",
    paddingTop: 4,
    paddingLeft: 12,
  },
  mapPin: {
    height: 15,
    width: 15,
    color: "#4B5563",
  },
});
