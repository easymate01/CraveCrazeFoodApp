import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { categories } from "../constants";
import { themeColors } from "../theme";
// import { getCategories } from "../api";
// import { urlFor } from "../sanity";
// import { themeColors } from "../theme";

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(null);

  //   useEffect(() => {
  //     getCategories().then((data) => {
  //       setCategories(data);
  //     });
  //   }, []);

  return (
    <View style={{ marginTop: 4 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {categories.map((category, index) => {
          return (
            <View
              key={index}
              style={{
                marginRight: 6,
                flex: 1,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 2,
                  borderRadius: 30,
                  backgroundColor: "gray",
                }}
              >
                <Image
                  style={{ width: 45, height: 45 }}
                  source={category.image}
                />
                <Text>{category.name}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
        {/* {categories.map((category) => {
          const isActive = category._id === activeCategory;
          const btnBackgroundColor = isActive
            ? themeColors.gray600
            : themeColors.gray200;
          const textFontWeight = isActive ? "bold" : "normal";
          const textColor = isActive
            ? themeColors.gray800
            : themeColors.gray500;

          return (
            <View key={category._id} style={{ marginRight: 6 }}>
              <TouchableOpacity
                onPress={() => setActiveCategory(category._id)}
                style={{
                  padding: 1,
                  borderRadius: 999,
                  shadowColor: themeColors.shadow,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  backgroundColor: btnBackgroundColor,
                }}
              >
                <Image
                  style={{ width: 45, height: 45 }}
                  source={{
                    uri: urlFor(category.image).url(),
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: textFontWeight,
                  color: textColor,
                  marginTop: 4,
                }}
              >
                {category.name}
              </Text>
            </View>
          );
        })} */}
      </ScrollView>
    </View>
  );
}
