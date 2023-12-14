import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import React from "react";
import * as Icon from "react-native-feather";

export default function RestaurantCard({
  id,
  item,
  title,
  imgUrl,
  rating,
  type,
  address,
  description,
  dishes,
  reviews,
  lng,
  lat,
}) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("Resturant", {
          id,
          title,
          imgUrl,
          rating,
          type,
          address,
          description,
          dishes,
          lng,
          reviews,
          lat,
        });
      }}
    >
      <View className="mr-6 bg-white rounded-3xl shadow-lg">
        <Image className="h-36 w-64 rounded-t-3xl" source={item} />

        <View className="px-3 pb-4 space-y-2">
          <Text className="text-lg font-bold pt-2">{title}</Text>
          <View className="flex-row items-center space-x-1">
            <Image
              source={require("../assets/images/fullStar.png")}
              className="h-4 w-4"
            />
            <Text className="text-xs">
              <Text className="text-green-700">{rating}</Text>
              <Text className="text-gray-700"> ({reviews} review)</Text> ·{" "}
              <Text className="font-semibold text-gray-700">{type}</Text>
            </Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <Icon.MapPin color="gray" width={15} height={15} />
            <Text className="text-gray-700 text-xs"> Nearby · {address}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
