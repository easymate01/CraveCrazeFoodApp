import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { categories } from "../constants";
import { themeColors } from "../theme";

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {categories.map((category, index) => {
          return (
            <View
              key={index}
              style={{
                ...styles.categoryContainer,
                marginRight: index === categories.length - 1 ? 15 : 6,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.buttonStyle}
                onPress={() => setActiveCategory(category._id)}
              >
                <Image style={styles.image} source={category.image} />
              </TouchableOpacity>
              <Text style={[styles.textStyle]}>{category.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = {
  container: {
    marginTop: 4,
  },
  scrollView: {
    paddingHorizontal: 15,
  },
  categoryContainer: {
    marginRight: 6,
  },
  image: {
    width: 45,
    height: 45,
  },
  buttonStyle: {
    backgroundColor: "#bebec2",
    borderRadius: 30,
    padding: 10,
  },
  textStyle: {
    fontSize: 16,
  },
};
