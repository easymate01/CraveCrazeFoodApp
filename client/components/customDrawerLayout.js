import React, { useState } from "react";
import { Modal, TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../slices/cartSlice";

const CustomDrawerLayout = ({ isOpen, onClose, drawerContent }) => {
  const navigation = useNavigation();
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
    onClose();
  };

  const cartItems = useSelector(selectCartTotal);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.drawer}>
          <View style={styles.mainContent}>
            <View style={styles.ShoppingCartContainer}>
              <Text style={styles.userName}>Gulyás Máté</Text>
              <Icon.ShoppingCart
                height="25"
                stroke="gray"
                onPress={() => navigateToScreen("Cart")}
              />

              <Text>{cartItems}</Text>
            </View>

            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={styles.drawerLink}
                onPress={() => navigateToScreen("Home")}
              >
                <Text style={styles.drawerLinkText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.drawerLink}
                onPress={() => navigateToScreen("Register")}
              >
                <Text style={styles.drawerLinkText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.overlay}
          onPress={onClose}
        ></TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  ShoppingCartContainer: {
    flexDirection: "row",
    paddingVertical: 20,
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "80%",
    height: "100%",
    backgroundColor: "white",
    zIndex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  mainContent: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: 80,
    padding: 20,
  },
  userName: {
    fontSize: 20,
  },
  menuContainer: {
    paddingTop: 20,
  },
  drawerLink: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  drawerLinkText: {
    fontSize: 16,
    color: "#333",
  },
});

export default CustomDrawerLayout;
