import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RestaurantScreen() {
  const { params } = useRoute();
  let item = params;
  // const navigation = useNavigation();
  console.log(item);
  return (
    <SafeAreaView>
      <ScrollView style={{ position: "relative" }}>
        <Image style={{ width: 100, height: "72px" }} source={item.image} />
        <Text>This will be the Restaurant Screen.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  searchInput: {
    width: "100%",
    height: "72px",
  },
};
