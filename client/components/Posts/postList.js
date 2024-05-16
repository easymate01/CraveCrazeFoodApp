import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import BottomNavigation from "../BottomNavigation/bottomNavigation";

export default function PostList() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Discount Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Akciók</Text>
          <Text style={styles.description}>akciós elérhető termékeink</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.discountCard}>
              <Image
                style={styles.discountImage}
                source={require("../../assets/images/bikeGuy.png")}
              />
              <Text style={styles.discountText}>-40% Mozdulj rá!</Text>
            </View>
            <View style={styles.discountCard}>
              <Image
                style={styles.discountImage}
                source={require("../../assets/images/bikeGuy.png")}
              />
              <Text style={styles.discountText}>-30% Vásárolj be!</Text>
            </View>
            <View style={styles.discountCard}>
              <Image
                style={styles.discountImage}
                source={require("../../assets/images/bikeGuy.png")}
              />
              <Text style={styles.discountText}>Akciók</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 18,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#A1A1A1",
    fontSize: 12,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 200,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#888",
  },
  discountCard: {
    backgroundColor: "#FFEAED",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginRight: 10,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  discountImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  discountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D62828",
  },
  categoryCard: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 5,
  },
  categoryText: {
    fontSize: 14,
  },
});
