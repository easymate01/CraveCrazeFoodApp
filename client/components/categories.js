import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import getCategories from "../services/GetDatas/getCategories";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    fetchFeaturedData();
  }, []);

  const fetchFeaturedData = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching featured data:", error);
    }
  };

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
                style={
                  activeCategory == category.id
                    ? styles.activeButtonStyle
                    : styles.buttonStyle
                }
                onPress={() => setActiveCategory(category.id)}
              >
                <Image
                  style={styles.image}
                  source={{ uri: category.imageUrl }}
                />
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
    backgroundColor: "#dcdcde",
    borderRadius: 30,
    padding: 10,
  },
  textStyle: {
    fontSize: 16,
    textAlign: "center",
  },
  activeButtonStyle: {
    backgroundColor: "#3b3b3b",
    borderRadius: 30,
    padding: 10,
  },
};
