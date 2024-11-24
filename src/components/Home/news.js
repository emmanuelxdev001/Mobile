import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { routeNames } from "../../../config";
import NewsItem from "./newsItem";
import Newspagination from "./newspagination";
import { PAGINATE_NEWS } from "../../redux/types";

const styles = StyleSheet.create({
  paginationWrapper: {
    marginTop: 30,
  },
});
export default function News({ navigation, setLoading }) {
  const { news } = useSelector((state) => state.newsModel);
  const dispatch = useDispatch();
  const paginate = (pageNumber) => {
    dispatch.newsModel[PAGINATE_NEWS]({ pageNumber });
  };
  return (
    <View>
      {Boolean(news) && news.length > 0 ? (
        news.map((item, index) => (
          <NewsItem
            key={index}
            navigation={navigation}
            item={item}
            index={index}
            setLoading={setLoading}
          />
        ))
      ) : (
        <Text>No news data</Text>
      )}

      {/* {Boolean(news) && news.length > 0 && (
        <> */}
      <Divider width={1} />
      <View style={styles.paginationWrapper}>
        <Newspagination pageNumber={1} paginate={paginate} />
      </View>
      {/* </>
      )} */}
    </View>
  );
}
