import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { themeColors } from "../../theme";

export default function InviteCard() {
  return (
    <View style={styles.inviteCard}>
      <View style={styles.inviteTextContainer}>
        <Text style={styles.inviteText}>$20</Text>
        <Text style={styles.inviteDescription}>
          Off when you invite your friends
        </Text>
      </View>
      <TouchableOpacity style={styles.inviteButton}>
        <Text style={styles.inviteButtonText}>Invite</Text>
        <Icon.ChevronRight color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  inviteCard: {
    backgroundColor: themeColors.bgColor(1),
    borderRadius: 20,
    padding: 20,
    margin: 10,
    alignItems: "center",
  },
  inviteTextContainer: {
    flexDirection: "row",
    backgroundColor: "#f3c56b",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  inviteText: {
    fontSize: 32,
    fontWeight: "bold",
    marginRight: 10,
  },
  inviteDescriptionContainer: {
    alignItems: "center",
  },
  inviteDescription: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
  inviteButton: {
    flexDirection: "row",
    backgroundColor: "#4D2DBE",
    padding: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  },
  inviteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
});
