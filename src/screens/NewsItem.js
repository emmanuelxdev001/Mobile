import { TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
import { Icon } from "react-native-elements";
import { routeNames } from "../../config";
import Comments from "../components/NewsItem/Comments";
import SharedHeader from "../components/Shared/Header";
import NewsCard from "../components/NewsItem/NewsCard";
import Loader from "../components/Shared/Loader";

export default function NewsItem({ route, navigation }) {
  const dispatch = useDispatch();
  const { newsId } = route.params;
  const [loading, setLoading] = useState(false);

  const { newsItem } = useSelector((state) => state.newsModel);
  const { images } = useSelector((state) => state.imagesModel);
  const { comments } = useSelector((state) => state.commentsModel);

  const getNewsData = async () => {
    setLoading(true);
    await dispatch.newsModel.getSingleNews({ newsId });
    await dispatch.imagesModel.getImages({ newsId, pageNumber: 1, limit: 20 });
    await dispatch.commentsModel.getComments({
      newsId,
      pageNumber: 1,
      limit: 100,
    });
    setLoading(false);
  };
  useEffect(() => {
    getNewsData();
    return getNewsData;
  }, []);

  return (
    <SafeAreaProvider>
      <SharedHeader title="News Item">
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => {
            navigation.navigate(routeNames.home);
          }}
        >
          <Icon type="antdesign" name="back" color="white" />
        </TouchableOpacity>
      </SharedHeader>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView>
          <NewsCard
            newsItem={newsItem}
            navigation={navigation}
            images={images}
          />

          <Comments
            comments={comments}
            newsId={newsItem.id}
            setLoading={setLoading}
          />
        </ScrollView>
      )}
    </SafeAreaProvider>
  );
}
