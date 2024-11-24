import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

export default function Loader() {
  return (
    <View
      style={{
        backgroundColor: "black",
        position: "absolute",
        opacity: 0.6,
        justifyContent: "center",
        alignItems: "center",
        top: 100,
        height: "100%",
        width: "100%",
      }}
    >
      <LottieView
        style={{ height: 200 }}
        source={require("../../assets/animations/scanner.json")}
        autoPlay
        speed={3}
      />
    </View>
  );
}
