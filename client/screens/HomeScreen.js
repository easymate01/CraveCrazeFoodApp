import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import React from "react";

function HomeScreen() {
  return (
    <View>
      <Text>This is home screen.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   searchBarContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingBottom: 8,
//   },
//   searchInputContainer: {
//     flexDirection: "row",
//     flex: 1,
//     alignItems: "center",
//     padding: 12,
//     borderRadius: 999,
//     borderWidth: 1,
//     borderColor: "gray",
//   },
//   searchIcon: {
//     height: 25,
//     width: 25,
//     stroke: "gray",
//   },
//   searchInput: {
//     marginLeft: 8,
//     flex: 1,
//   },
//   locationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 0,
//     borderLeftWidth: 2,
//     paddingLeft: 8,
//     borderColor: "gray",
//   },
//   locationIcon: {
//     height: 20,
//     width: 20,
//     stroke: "gray",
//   },
//   locationText: {
//     color: "gray",
//   },
//   slidersContainer: {
//     backgroundColor: themeColors.bgColor(1),
//     padding: 12,
//     borderRadius: 999,
//   },
//   slidersIcon: {
//     height: 20,
//     width: 20,
//     strokeWidth: 2.5,
//     stroke: "white",
//   },
//   mainContent: {
//     marginTop: 5,
//     paddingBottom: 50,
//   },
// });
