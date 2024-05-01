import * as Icon from "react-native-feather";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import Categories from "../components/categories";
import FeaturedRow from "../components/featuredRow";
import { featured, featured2 } from "../constants";
import getFeatured from "../services/GetDatas/getFeatured";
import CustomDrawerLayout from "../components/customDrawerLayout";

function HomeScreen() {
  const [featuredData, setFeaturedData] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  useEffect(() => {
    fetchFeaturedData();
  }, []);

  const fetchFeaturedData = async () => {
    try {
      const data = await getFeatured();
      setFeaturedData(data);
    } catch (error) {
      console.error("Error fetching featured data:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={styles.searchBarContainer} />
      <View style={styles.searchBarContainer}>
        <View style={styles.searchInputContainer}>
          <Icon.Search height="25" stroke="gray" />
          <TextInput placeholder="Restaurants" style={styles.searchInput} />
          <View style={styles.locationContainer}>
            <Icon.MapPin height="20" width="20" stroke="gray" />
            <Text style={styles.locationText}>Budapest</Text>
          </View>
        </View>
        <View style={styles.slidersContainer}>
          <TouchableOpacity onPress={toggleDrawer}>
            <Icon.Sliders height="20" strokeWidth={2.5} stroke="white" />
          </TouchableOpacity>
        </View>

        <CustomDrawerLayout
          isOpen={isDrawerOpen}
          onClose={toggleDrawer}
        ></CustomDrawerLayout>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        <Categories />

        <View style={{ marginTop: 5 }}>
          {[featured].map((item, index) => {
            return (
              <FeaturedRow
                key={index}
                title={item.title}
                restaurants={item.restaurants}
                description={item.description}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  searchInputContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    padding: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "gray",
  },
  searchIcon: {
    height: 25,
    width: 25,
    stroke: "gray",
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
    borderLeftWidth: 2,
    paddingLeft: 8,
    borderColor: "gray",
  },
  locationText: {
    color: "gray",
  },
  slidersContainer: {
    backgroundColor: themeColors.bgColor(1),
    padding: 12,
    borderRadius: 999,
  },
  slidersIcon: {
    height: 20,
    width: 20,
    strokeWidth: 2.5,
    stroke: "white",
  },
  mainContent: {
    marginTop: 5,
    paddingBottom: 50,
  },
});
