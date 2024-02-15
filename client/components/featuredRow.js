import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import RestaurantCard from "./restaurantCard";

function FeaturedRow({ title, description, restaurants }) {
  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        style={styles.scrollView}
      >
        {restaurants.map((resturant, index) => {
          return <RestaurantCard key={index} item={resturant} />;
        })}
      </ScrollView>
    </View>
  );
}
export default FeaturedRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  description: {
    color: "#A1A1A1",
    fontSize: 12,
  },
  seeAll: {
    // color: themeColors.text,
    fontWeight: "bold",
  },
  scrollView: {
    overflow: "visible",
    paddingVertical: 5,
  },
});
