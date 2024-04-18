import React, { useState } from "react";
import { Modal, TouchableOpacity, View, StyleSheet, Text } from "react-native";

const CustomDrawerLayout = ({ isOpen, onClose, drawerContent, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.drawer}>{drawerContent}</View>
        <TouchableOpacity style={styles.overlay} onPress={onClose}>
          <View style={styles.mainContent}>{children}</View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
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
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomDrawerLayout;
