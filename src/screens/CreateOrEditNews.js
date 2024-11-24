import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import CreateOrEditForm from "../components/CreateOrEditNews/CreateOrEditForm";
import { Divider, Icon } from "react-native-elements";
import { routeNames } from "../../config";
import SharedHeader from "../components/Shared/Header";

export default function CreateOrEditNews({ route, navigation }) {
  return (
    <SafeAreaProvider>
      <SharedHeader title={route.params?.action === "edit" ? "Edit" : "Create"}>
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => {
            navigation.navigate(routeNames.home);
          }}
        >
          <Icon type="antdesign" name="back" color="white" />
        </TouchableOpacity>
      </SharedHeader>

      <CreateOrEditForm navigation={navigation} route={route} />
    </SafeAreaProvider>
  );
}
