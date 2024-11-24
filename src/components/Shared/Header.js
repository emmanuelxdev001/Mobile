import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Header, Icon } from "@rneui/themed";

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#397af8",
    // marginBottom: 20,
    width: "100%",
    padding: 0,
    // paddingVertical: 15,
  },
  heading: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  subheaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default function SharedHeader({ title, children, noLeftComponent }) {
  return (
    <Header
      leftComponent={
        noLeftComponent
          ? undefined
          : {
              icon: "menu",
              color: "#fff",
            }
      }
      rightComponent={<View style={styles.headerRight}>{children}</View>}
      centerComponent={{ text: title, style: styles.heading }}
    />
  );
}
