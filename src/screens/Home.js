import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Divider, Icon } from "react-native-elements";
import News from "../components/Home/news";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import SharedHeader from "../components/Shared/Header";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { routeNames } from "../../config";
import Loader from "../components/Shared/Loader";

const styles = StyleSheet.create({
  homeWrapper: {},
});
export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const state = useSelector((state) => state.newsModel);
  const getNews = useCallback(async () => {
    setLoading(true);
    await dispatch.newsModel.getNews({
      pageNumber: state.currentPage,
      limit: 10,
    });
    setLoading(false);
  }, [state.currentPage]);

  useEffect(() => {
    getNews();
  }, [state.currentPage]);

  return (
    <SafeAreaProvider>
      <SharedHeader title="News App">
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => {
            navigation.navigate(routeNames.createOrEditNews, {
              action: "create",
            });
          }}
        >
          <Icon type="antdesign" name="plus" color="white" />
        </TouchableOpacity>
      </SharedHeader>
      <Divider width={1} />
      <ScrollView
        style={styles.homeWrapper}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <Loader />
        ) : (
          <News navigation={navigation} setLoading={setLoading} />
        )}
      </ScrollView>
    </SafeAreaProvider>
  );
}
