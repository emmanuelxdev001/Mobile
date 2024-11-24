import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  box: {
    padding: 10,
    backgroundColor: "#000",
  },
  text: {
    color: "#fff",
  },
  boxDisabled: {
    padding: 10,
    backgroundColor: "#eee",
  },
  textDisabled: {
    color: "#000",
  },
});

export default function Newspagination({ pageNumber, paginate }) {
  const currentPage = useSelector((state) => state.newsModel.currentPage);
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={currentPage === 1 ? styles.boxDisabled : styles.box}
        onPress={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Text style={currentPage === 1 ? styles.textDisabled : styles.text}>
          Prev
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.box}
        onPress={() => paginate(currentPage + 1)}
      >
        <Text style={styles.text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}
